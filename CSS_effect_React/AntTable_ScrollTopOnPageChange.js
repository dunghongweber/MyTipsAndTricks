const scrollToTop = () => {
    const docTable = document.querySelector('.ant-table-body')
    if (docTable) {
      docTable.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
