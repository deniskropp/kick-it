import { KickTemplate, useCohere, useKickTemplate } from '../src'

async function run() {
    const templ: KickTemplate = useKickTemplate({
        constants: [
            {
                key: 'name',
                value: 'John Moe'
            }
        ],
        contents: [
            'Hello, {name}!'
        ]
    })

    const result = await useCohere(templ)

    console.log(result)

    return result
}


run()
