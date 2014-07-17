
var editAction = {name: 'edit', icon: 'glyphicon glyphicon-pencil'};
var deleteAction = {name: 'delete', icon: 'glyphicon glyphicon-trash'};

module.exports = {
    BasicObject: {
        title: 'Basic',
        actions: [editAction, deleteAction],
        schema: {
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            thumb: {
                title: 'thumbnail',
                type: 'string'
            }
        }
    },
    Literal: {
        populate: {
            index: 1,
            display: 1
        },
        __title__: {bindTo: 'string'},
        __description__: {template: 'bool is {{#if boolean}}yes{{else}}no{{/if}} with integer {{integer}} {{#if basic}}and a {{basic.__title__}}{{/if}}'},
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
        filters: [
            {route: 'literal.truthy', label: 'Truthy', icon: 'glyphicon glyphicon-ok'},
            {route: 'literal.falsy', label: 'Falsy', icon: 'glyphicon glyphicon-remove'}
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
                type: 'BasicObject'
            }
        }
    },
    I18n: {
        title: {
            fr: 'Internationnalisation',
            en: 'Internationalization',
        },
        i18n: {
            langField: 'lang',
            queryCurrentLand: true
        },
        actions: [editAction],
        __title__: {bindTo: 'string'},
        schema: {
            string: {
                type: 'string',
                i18n: true,
                fallbackDefaultLang: true
            },
            multi: {
                type: 'string',
                i18n: true,
                multi: true,
                fallbackDefaultLang: true
            },
            stringAll: {
                title: {
                    en: 'display all string',
                    fr: 'chaine internationalisée'
                },
                type: 'string',
                i18n: true,
                displayAllLanguages: true
            },
            multiAll: {
                type: 'string',
                i18n: true,
                multi: true,
                displayAllLanguages: true
            },
            lang: {
                type: 'string'
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
        title: {
            fr: 'template personnalisée'
        },
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
                sortOrder: 'desc'
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
                type: 'BasicObject',
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
    },
    About: {
        static: true
    },
    HiddenObject: {
        hidden: true,
        schema: {
            title: {
                type: 'string'
            }
        }
    }
};
