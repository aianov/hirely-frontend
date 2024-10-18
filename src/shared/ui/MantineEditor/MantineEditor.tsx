import { RichTextEditor } from '@mantine/rte'
import { useState } from 'react'


export const MantineEditor = () => {
	const [value, onChange] = useState('<p>Your initial <b>html value</b> or an empty string to init editor without value</p>')

	return <RichTextEditor value={value} onChange={onChange} />
}