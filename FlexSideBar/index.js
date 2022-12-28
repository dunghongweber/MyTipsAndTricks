import SubMenu from './SubMenu'
import { SideBarContainer, SideBarItem } from './styles'

const SIDEBAR_ITEMS = {
  dashboard: {
    label: 'Dashboard',
    icon: HomeIcon,
    filledIcon: FilledHomeIcon,
    url: '/dashboard'
  },
  job: {
    label: 'Job Posts',
    icon: JobIcon,
    filledIcon: FilledJobIcon,
    url: '/jobs'
  },
  manager: {
    label: 'Managers List',
    icon: ManagerIcon,
    filledIcon: FilledManagerIcon,
    url: '/managers'
  },
  hiringPipeline: {
    label: 'Applicants Database',
    icon: HiringPipelineIcon,
    filledIcon: FilledHiringPipelineIcon,
    url: '/applicant-database'
  },
  automationEmail: {
    label: 'Automation Emails',
    icon: HiringPipelineIcon,
    filledIcon: FilledHiringPipelineIcon,
    url: '/automation-emails'
  }
}

const SideBar = () => {
  const location = useLocation()
  const [isClose, setIsClose] = useState(
    localStorage.getItem('navbar') === 'close'
  )

  const handleSidebar = () => {
    setIsClose(!isClose)
    localStorage.setItem('navbar', isClose ? 'open' : 'close')
  }

  return (
    <SideBarContainer isClose={isClose}>
      {Object.values(SIDEBAR_ITEMS).map((item, index) => {
        const isActive = location.pathname === item.url

        if (!item.subItems) {
          return (
            <Link to={item.url}>
              <SideBarItem isActive={isActive} href={item.url} key={index}>
                <img
                  src={isActive ? item.filledIcon : item.icon}
                  alt={item.label}
                  className="icon"
                />

                {!isClose && <span className="text">{item.label}</span>}
              </SideBarItem>
            </Link>
          )
        } else {
          return <SubMenu item={item} key={index} />
        }
      })}

      <div className="footer-button" onClick={handleSidebar}>
        {isClose ? <RightOutlined /> : <LeftOutlined />}
      </div>
    </SideBarContainer>
  )
}

export default SideBar
