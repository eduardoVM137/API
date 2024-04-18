import assert from "node:assert";
import test from 'node:test';
import * as operacion from './modulo.js';

test('una suma de 2 mas 2 y es 4',()=>{
    let resultado=operacion.suma(2,2);
    assert.equal(resultado,4)
})