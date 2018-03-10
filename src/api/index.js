const defaultArticle = {
  title: 'Create a GraphQL Server',
  text: 'This is how to create a GraphQL Server',
  author: 'Eder Deftone',
  published: true,
  likes: 134
};
const articles = [defaultArticle];

const getArticleById = (id) => new Promise((resolve) => {
  const [article] = articles.filter((article) => {
    return article.id === id;
  });

  resolve(article);
});

const getArticles = () => new Promise((resolve) => resolve(articles));

const createArticle = ({ title, author, text = '', published = false }) => {
  const article = {
    id: (new Buffer(title, 'utf8')).toString('base64'),
    likes: Math.floor((Math.random() * 1000) + 1),
    title,
    text,
    author,
    published,
  };

  articles.push(article);

  return article;
};

const getObjectById = (type, id) => {
  const types = {
    article: getArticleById,
  };

  return types[type](id);
};

exports.getArticleById = getArticleById;
exports.getArticles = getArticles;
exports.createArticle = createArticle;
exports.getObjectById = getObjectById;