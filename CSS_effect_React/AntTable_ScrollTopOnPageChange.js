const scrollToTop = () => {
    const docTable = document.querySelector('.ant-table-body')
    if (docTable) {
      docTable.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updatePagination = (newPage, newLimit) => {
    //...pagination code....
      
    //call scroll to top for table
    scrollToTop()

  }
