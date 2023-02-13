const {normalizeUrl,
getURLSFromHTML} = require('./crawl')

const {test,expect} = require('@jest/globals')

test('normalizeUrl strip protocol',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    
    expect(actual).toEqual(expected)
})

test('normalizeUrl trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals',()=>{
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http',()=>{
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML absolute',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/"> Boot Dev Blog </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML relative',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"> Boot Dev Blog </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML multiple mixed',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"> Boot Dev Blog </a>
        </body>
        <body>
            <a href="/path2/"> Boot Dev Blog </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML invalid',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="Invalid"> Boot Dev Blog </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLSFromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    
    expect(actual).toEqual(expected)
})
