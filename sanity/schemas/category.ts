export default {
    name: 'category',
    type: 'document',
    title: 'Category',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
           name:'image',
            type:'image',
            title:'Image',
            fields: [
                { 
                  name: 'alt',
                  type: 'string',
                }
              ]
        }
    ]
}