import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import HxDemo1 from '../index.vue'

describe('HxDemo1.vue', () => {
  test('render', () => {
    const wrapper = mount(HxDemo1, {})
    expect(wrapper.classes()).toContain('')
  })
})
