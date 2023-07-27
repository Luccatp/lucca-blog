import { createClient } from "next-sanity"

const projectId = 'efnb7tvs'
const dataset = 'production'
const apiVersion = '2021-01-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true
})