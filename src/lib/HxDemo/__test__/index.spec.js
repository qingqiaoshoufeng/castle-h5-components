import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import HxDemo from '../index.vue'

describe('HxDemo.vue', () => {
  test('render', () => {
    const wrapper = mount(HxDemo, {})
    expect(wrapper.classes()).toContain('ant-btn-primary')
  })
})
