import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import RequireTypesense from '../../shared/lib/decorators/require-typesense.decorator';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import { authorizeNotFound, SearchService } from '../../shared/modules/search/search.service';
import { client } from '../../typesense.config';
import { InfoDoc } from './info-doc.entity';

export interface IndexedInfoDoc {
  user: string;
  originalName: string;
  name?: string;
  year?: number;
  description?: string;
  id: string;
  createdAt: string;
}

@Injectable()
export class InfoDocSearchService extends SearchService<InfoDoc, IndexedInfoDoc> {
  private static readonly schema: CollectionCreateSchema = {
    name: 'info-docs',
    fields: [
      { name: 'user', type: 'string' },
      { name: 'originalName', type: 'string' },
      { name: 'name', type: 'string', optional: true },
      { name: 'year', type: 'string', optional: true },
      { name: 'description', type: 'string', optional: true },
      { name: 'createdAt', type: 'string' },
    ],
  };

  private readonly documents = client.collections<IndexedInfoDoc>('info-docs').documents();

  constructor(
    @InjectRepository(InfoDoc) private readonly infoDocRepository: BaseRepository<InfoDoc>,
  ) { super(InfoDocSearchService.schema, 'info-docs'); }

  @RequireTypesense()
  public async init(): Promise<void> {
    const infoDocs = await this.infoDocRepository.find({}, ['file', 'file.user']);
    await super.init(infoDocs, entity => this.toIndexedEntity(entity));
  }

  @RequireTypesense()
  public async add(infoDoc: InfoDoc): Promise<void> {
    await this.documents.create(this.toIndexedEntity(infoDoc));
  }

  @RequireTypesense()
  public async update(infoDoc: InfoDoc): Promise<void> {
    await this.documents.update(this.toIndexedEntity(infoDoc)).catch(authorizeNotFound);
  }

  @RequireTypesense()
  public async remove(infoDocId: string): Promise<void> {
    await this.documents.delete(infoDocId).catch(authorizeNotFound);
  }

  @RequireTypesense()
  public async search(queries: SearchParams<IndexedInfoDoc>): Promise<SearchResponse<IndexedInfoDoc>> {
    return await this.documents.search(queries);
  }

  @RequireTypesense()
  public async searchAndPopulate(queries: SearchParams<IndexedInfoDoc>): Promise<SearchResponse<InfoDoc>> {
    const results = await this.documents.search(queries);

    if (results.hits?.length) {
      const infoDocIds = results.hits.map(hit => hit.document.id);
      const infoDocs = await this.infoDocRepository.find({ infoDocId: { $in: infoDocIds } });
      for (const hit of results.hits)
        // @ts-expect-error: This works, TypeScript... I know there is a mismatch between IndexedInfoDoc.id and
        // InfoDoc.infoDocId. I know.
        hit.document = infoDocs.find(infoDoc => infoDoc.infoDocId.toString() === hit.document.id)!;
    }
    // @ts-expect-error: Ditto.
    return results;
  }

  public toIndexedEntity(infoDoc: InfoDoc): IndexedInfoDoc {
    return {
      user: infoDoc.file.user.username,
      originalName: infoDoc.file.originalName,
      name: infoDoc.name,
      year: infoDoc.year,
      description: infoDoc.description,
      id: infoDoc.infoDocId,
      createdAt: infoDoc.createdAt.toString(),
    };
  }
}
