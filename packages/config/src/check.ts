import Ajv from 'ajv'
import fs from 'node:fs'

const ajv = new Ajv()

export function check(filePath: string) {
  // Load the ScalarConfig type JSON schema
  const scalarConfigSchema = fs.readFileSync(
    process.cwd() + '/src/ScalarConfigJsonSchema.json',
    'utf8',
  )

  // Load the JSON file to validate
  const data = fs.readFileSync(process.cwd() + filePath, 'utf8')

  // Create the validate instance using the ScalarConfig type JSON schema
  const validate = ajv.compile(JSON.parse(scalarConfigSchema))

  // Validate the JSON file
  const valid = validate(JSON.parse(data))

  return {
    valid: valid,
    data: validate.errors,
  }
}
