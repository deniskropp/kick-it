// TODO: replace this with ParsedContent
export interface Item {
    type: string
    tag?: string
    value?: string
    children?: Item[]
}


export interface Message {
    role: string
    content: string
}


/**
 * Represents a constant used in a KickTemplate.
 * @property key - The key of the constant.
 * @property value - The value of the constant.
 */
export type KickTemplateConstant = {
    key: string
    value: string
}

/**
 * Represents an item in the context of a KickTemplate.
 * It can be either an Item or a string.
 */
export type KickTemplateContextItem = Item | string

/**
 * Represents the content of a KickTemplate.
 * It can be either an Item or a string.
 */
export type KickTemplateContent = Item | string

/**
 * Represents the parent KickTemplate of a KickTemplate.
 */
export type KickTemplateParent = KickTemplate

/**
 * Interface for a KickTemplate.
 */
export interface KickTemplate {
    /**
     * The parent KickTemplate.
     */
    parent?: KickTemplateParent
    /**
     * The constants used in the KickTemplate.
     */
    constants: KickTemplateConstant[]
    /**
     * The context items used in the KickTemplate.
     */
    context: KickTemplateContextItem[]
    /**
     * The contents of the KickTemplate.
     */
    contents: KickTemplateContent[]

    /**
     * Generate the messages from the template.
     * @returns The messages generated from the template.
     */
    make(): Message[]

    /**
     * Generate a single message from the template.
     * @param prompt - The prompt to preface the message with.
     * @returns The generated message.
     */
    makeSingle(prompt?: string): string
}
