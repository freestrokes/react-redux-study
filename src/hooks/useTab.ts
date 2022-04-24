import {useState} from 'react';

const useTab = (initialTab: number, allTabs: any) => {
	if (!allTabs || !Array.isArray(allTabs)) {
		return;
	}

	const [currentIndex, setCurrentIndex] = useState(initialTab);

	return {
		currentTab: allTabs[currentIndex],
		changeTab: setCurrentIndex
	};
}

export default useTab;
