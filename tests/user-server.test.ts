import { expect, describe, it } from 'vitest'
import {  actions } from '../src/routes/users/[[id]]/+page.server' 

describe('actions', () => {
 it('creates a user', () => {
   const result = actions.create({ /* test data */ }) 
   expect(result).toEqual({ /* expected */ })
 })

 it('reads a user', () => {
   const result = actions.read({ params: { id: '1' }})
   expect(result).toEqual({ /* expected */ })
 })

 it('updates a user', () => {
   const result = actions.update({ /* test data */})
   expect(result).toEqual({ /* expected */ }) 
 })

 it('deletes a user', () => {
   const result = actions.delete({ params: { id: '1' }})
   expect(result).toEqual({ /* expected */})
 })
})
