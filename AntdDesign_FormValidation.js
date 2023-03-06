//Custom validation
/**
  https://ant.design/components/form#form
  read FAQ Custom Validator
*/
<Form>
  <Form.Item
    rules={[
      {
        required: true,
        message: 'The name is required.',
      },
      {
        message: 'this is custom',
        validator: async (rule, value) => {
          if (value === 'Hello') {
            throw new Error('Do not accept Hello');
          }
        }
       }
     ]}
  >
    <Input />
  </Form.Item>
</Form>
