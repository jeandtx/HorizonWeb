import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import type { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import RequireTypesense from '../../shared/lib/decorators/require-typesense.decorator';
import { BaseRepository } from '../../shared/lib/repositories/base.repository';
import { authorizeNotFound, SearchService } from '../../shared/modules/search/search.service';
import { client } from '../../typesense.config';
import { StudyDoc } from './study-doc.entity';

export interface IndexedStudyDoc {
  user: string;
  originalName: string;
  subjectName: string;
  subjectEnglishName: string;
  year?: number;
  description?: string;
  id: string;
  createdAt: string;
}

@Injectable()
export class StudyDocSearchService extends SearchService<StudyDoc, IndexedStudyDoc> {
  private static readonly schema: CollectionCreateSchema = {
    name: 'study-docs',
    fields: [
      { name: 'user', type: 'string' },
      { name: 'originalName', type: 'string' },
      { name: 'subjectName', type: 'string' },
      { name: 'subjectEnglishName', type: 'string' },
      { name: 'year', type: 'string', optional: true },
      { name: 'description', type: 'string', optional: true },
      { name: 'createdAt', type: 'string' },
    ],
  };

  private readonly documents = client.collections<IndexedStudyDoc>('study-docs').documents();

  constructor(
    @InjectRepository(StudyDoc) private readonly studyDocRepository: BaseRepository<StudyDoc>,
  ) { super(StudyDocSearchService.schema, 'study-docs'); }

  @RequireTypesense()
  public async init(): Promise<void> {
    const studyDocs = await this.studyDocRepository.find({}, ['file', 'file.user', 'subject']);
    await super.init(studyDocs, entity => this.toIndexedEntity(entity));
  }

  @RequireTypesense()
  public async add(studyDoc: StudyDoc): Promise<void> {
    await this.documents.create(this.toIndexedEntity(studyDoc));
  }

  @RequireTypesense()
  public async update(studyDoc: StudyDoc): Promise<void> {
    await this.documents.update(this.toIndexedEntity(studyDoc)).catch(authorizeNotFound);
  }

  @RequireTypesense()
  public async remove(studyDocId: string): Promise<void> {
    await this.documents.delete(studyDocId).catch(authorizeNotFound);
  }

  @RequireTypesense()
  public async search(queries: SearchParams<IndexedStudyDoc>): Promise<SearchResponse<IndexedStudyDoc>> {
    return await this.documents.search(queries);
  }

  @RequireTypesense()
  public async searchAndPopulate(queries: SearchParams<IndexedStudyDoc>): Promise<SearchResponse<StudyDoc>> {
    const results = await this.documents.search(queries);

    if (results.hits?.length) {
      const studyDocIds = results.hits.map(hit => hit.document.id);
      const studyDocs = await this.studyDocRepository.find({ studyDocId: { $in: studyDocIds } });
      for (const hit of results.hits)
        // @ts-expect-error: This works, TypeScript... I know there is a mismatch between IndexedStudyDoc.id and
        // StudyDoc.studyDocId. I know.
        hit.document = studyDocs.find(studyDoc => studyDoc.studyDocId.toString() === hit.document.id)!;
    }
    // @ts-expect-error: Ditto.
    return results;
  }

  public toIndexedEntity(studyDoc: StudyDoc): IndexedStudyDoc {
    return {
      user: studyDoc.file.user.username,
      originalName: studyDoc.file.originalName,
      subjectName: studyDoc.subject.name,
      subjectEnglishName: studyDoc.subject.englishName,
      year: studyDoc.year,
      description: studyDoc.description,
      id: studyDoc.studyDocId,
      createdAt: studyDoc.createdAt.toString(),
    };
  }
}
