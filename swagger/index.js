const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

const options = {
    customCss: '.swagger-ui .topbar { display: none }',
};

module.exports = {
    options,
    swaggerDocument
}