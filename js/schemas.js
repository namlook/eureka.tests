
var editAction = {name: 'edit', icon: 'glyphicon glyphicon-pencil'};
var deleteAction = {name: 'delete', icon: 'glyphicon glyphicon-trash'};

module.exports = {
    Basic: {
        actions: [editAction, deleteAction],
        schema: {
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            thumb: {
                type: 'string'
            }
        }
    },
    Literal: {
        __title__: {bindTo: 'string'},
        actions: [
            editAction,
            deleteAction,
            {name: 'divideFloatBy2', label: 'float/2', secondary: true},
            {
                name: 'toggleBoolean',
                field: 'boolean',
                toggle: {
                    false: {label: 'check boolean', icon: 'glyphicon glyphicon-unchecked'},
                    true:  {label: 'uncheck boolean', icon: 'glyphicon glyphicon-check'},
                }
            }
        ],
        sortBy: [
            {label: 'String', order: 'string'},
            {label: 'Boolean (asc) and Integer (desc)', order: 'boolean,-integer', default: true}
        ],
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
            },
            basic: {
                type: 'Basic'
            }
        }
    },
    CustomDescriptor: {
        __title__: {template: "{{string}} {{#if float}}({{float}}){{/if}}"},
        __description__: {template: "{{#if boolean}}{{integer}} persons{{else}}no one{{/if}}"},
        __thumb__: {template: "http://placekitten.com/{{integer}}/{{integer}}"},
        search: {
            field: 'string',
            placeholder: 'search a really custom object...'
        },
        sortBy: '-integer,float',
        title: 'really custom descriptor',
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
    },
    CustomTemplate: {
        actions: [editAction, deleteAction],
        schema: {
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            thumb: {
                type: 'string'
            },
            boolean: {
                type: 'boolean'
            }
        }
    },
    Multi: {
        // display: {
        //     title: {bindTo: 'string'},
        //     description: {template: '--{{string}}--'}
        // },
        // actions: [{
        //     name: 'edit',
        //     labels: {en: 'edit', fr: 'modifier'}
        // }, {
        //     name: 'delete',
        //     labels: {en: 'delete', fr: 'supprimer'}
        // }],
        schema: {
            title: {
                type: 'string'
            },
            string: {
                type: 'string',
                multi: true
            },
            integer: {
                type: 'integer',
                multi: true,
                orderBy: 'desc'
            },
            float: {
                type: 'float',
                multi: true
            },
            date: {
                type: 'date',
                multi: true
            },
            basic: {
                type: 'Basic',
                multi: true
            },
            literal: {
                type: 'Literal',
                multi: true
                // suggest: {
                //     field: 'string',
                //     sortBy: '-integer',
                //     title: {template: "erf: {{title}}"}
                // }
            }
        }
    }
};
