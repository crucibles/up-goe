import { TestBed, inject } from '@angular/core/testing';

import { CommentPostService } from './comment-post.service';

describe('CommentPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentPostService]
    });
  });

  it('should be created', inject([CommentPostService], (service: CommentPostService) => {
    expect(service).toBeTruthy();
  }));
});
