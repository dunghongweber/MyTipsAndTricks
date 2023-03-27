//close component on click outside
useEffect(() => {
    const rootElement = document.getElementById('root')

    if (rootElement) {
      rootElement.addEventListener('click', closeCalendar)
    }

    return () => {
      rootElement.removeEventListener('click', closeCalendar)
    }
  }, [])
