'use server'

import { EditorialResponse } from "@/types/editorial"

export async function getEditorial() {
    const url = 'https://api.deezer.com/editorial?country=GT'
    const response = await fetch(url)
    const data = await response.json() as EditorialResponse
    return data
}

export async function getCharts() {
    const url = 'https://api.deezer.com/chart?country=gt'
    const response = await fetch(url)
    const data = await response.json()
    return data
}