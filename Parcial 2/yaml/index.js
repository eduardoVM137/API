import YAML from 'yaml'
import fs from 'fs'

const file = fs.readFileSync('./Parcial 2/yaml/afile.yml', 'utf8');

YAML.parse(file)
console.log("patas")
console.log(YAML.parse(file))