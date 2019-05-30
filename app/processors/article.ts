import Article from "../resources/article";
import Vote from "../resources/vote";
import { KnexProcessor, HasId } from "@ebryn/jsonapi-ts";

export default class ArticleProcessor<ResourceT extends Article> extends KnexProcessor<ResourceT> {
  static resourceClass = Article;

  attributes = {
    async voteCount(this: ArticleProcessor<Article>, article: HasId) {
      const processor = <KnexProcessor<Vote>>await this.processorFor("vote");

      const [result] = await processor
        .getQuery()
        .where({ article_id: article.id })
        .count();

      return result["count(*)"];
    }
  };
}
