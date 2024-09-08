import { useCallback, useState } from 'react';

export const useSheet = (initialValue = false) => {
	const [visible, setVisible] = useState(initialValue);

	const open = useCallback(() => setVisible(true), []);
	const close = useCallback(() => setVisible(false), []);

	return { visible, open, close };
};