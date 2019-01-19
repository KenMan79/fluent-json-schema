const { MixedSchema } = require('./MixedSchema')
const { S, TYPES } = require('./FluentSchema')

describe('MixedSchema', () => {
  it('defined', () => {
    expect(MixedSchema).toBeDefined()
  })

  describe('constructor', () => {
    it('without params', () => {
      expect(MixedSchema().valueOf()).toEqual({})
    })
  })

  describe('from S', () => {
    it('valid', () => {
      const types = [
        TYPES.STRING,
        TYPES.NUMBER,
        TYPES.BOOLEAN,
        TYPES.INTEGER,
        TYPES.OBJECT,
        TYPES.ARRAY,
        TYPES.NULL,
      ]
      expect(
        S()
          .mixed(types)
          .valueOf()
      ).toEqual({
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: types,
      })
    })
    it('invalid param', () => {
      const types = ''
      expect(() => {
        S().mixed(types)
      }).toThrow(
        "Invalid 'types'. It must be an array of types. Valid types are string | number | boolean | integer | object | array | null"
      )
    })

    it('invalid type', () => {
      const types = ['string', 'invalid']
      expect(() => {
        S().mixed(types)
      }).toThrow(
        "Invalid 'types'. It must be an array of types. Valid types are string | number | boolean | integer | object | array | null"
      )
    })
  })

  it('sets a type object to the prop', () => {
    expect(
      S()
        .object()
        .prop(
          'prop',
          S()
            .mixed([TYPES.STRING, TYPES.NUMBER])
            .minimum(10)
            .maxLength(5)
        )
        .valueOf()
    ).toEqual({
      $schema: 'http://json-schema.org/draft-07/schema#',
      properties: {
        prop: { maxLength: 5, minimum: 10, type: ['string', 'number'] },
      },
      type: 'object',
    })
  })
})