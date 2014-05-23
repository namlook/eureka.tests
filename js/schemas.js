module.exports = {
    Literal: {
        __title__: {template: "{{string}} {{#if float}}({{float}}){{/if}}"},
        schema: {
            string: {
                type: 'string',
                // required: true
            },
            boolean: {
                type: 'boolean'
            },
            integer: {
                type: 'integer',
                // required: true
            },
            float: {
                type: 'float'
                // precision: 3
            },
            date: {
                type: 'date'
            }
        }
    }
};
