
var editAction = {name: 'edit', icon: 'glyphicon glyphicon-pencil'};
var deleteAction = {name: 'delete', icon: 'glyphicon glyphicon-trash'};

module.exports = {
    BasicObject: {
        label: 'Basic',
        schema: {
            title: {
                type: 'string',
                label: {
                    fr: 'titre'
                }
            },
            description: {
                type: 'string',
            },
            thumbUrl: {
                label: {
                    en: 'thumbnail',
                    fr: 'miniature'
                },
                type: 'string'
            },
            hiddenField: {
                hidden: true,
                type: 'string'
            }
        },
        views: {
            display: {
                actions: [editAction, deleteAction]
            }
        }
    },
    Literal: {
        aliases: {
            title: 'string'
        },
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
        },
        views: {
            index: {
                populate: 1,
                sortBy: [
                    {label: 'String', order: 'string'},
                    {label: 'Boolean (asc) and Integer (desc)', order: 'boolean,-integer', default: true}
                ],
                filters: [
                    {route: 'literal.truthy', label: 'Truthy', icon: 'glyphicon glyphicon-ok'},
                    {route: 'literal.falsy', label: 'Falsy', icon: 'glyphicon glyphicon-remove'}
                ],
            },
            display: {
                populate: 1,
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
                ]
            }
        }
    },
    I18n: {
        label: {
            fr: 'Internationnalisation',
            en: 'Internationalization',
        },
        aliases: {
            title: 'string'
        },
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
                label: {
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
        },
        i18n: {
            langField: 'lang',
            queryCurrentLand: true
        },
        views: {
            display: {
                actions: [editAction]
            }
        }
    },
    CustomDescriptor: {
        label: 'really custom descriptor',
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
        },
        views: {
            index: {
                search: {
                    field: 'string',
                    placeholder: 'search a really custom object...'
                },
                sortBy: '-integer,float',
            }
        }
    },
    CustomTemplate: {
        label: {
            fr: 'template personnalisée'
        },
        views: {
            display: {
                actions: [editAction, deleteAction]
            }
        },
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
    Populate: {
        schema: {
            basic: {
                type: 'BasicObject'
            },
            literal: {
                type: 'Literal'
            },
            integer: {
                type: 'integer'
            }
        },
        views: {
            index: {
                populate: 2,
                sortBy: '-basic.title,literal.string',
            },
            display: {
                populate: 2
            }
        }
    },
    About: {
        label: {
            en: {
                plural: 'About'
            },
            fr: {
                singular: 'A propos',
                plural: 'A propos'
            }
        },
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
