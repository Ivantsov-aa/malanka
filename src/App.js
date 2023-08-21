import {useEffect, useState} from "react";
import {browserName} from "react-device-detect";
import {Route, Routes, useLocation} from "react-router-dom";
import {Charging} from "./components/charging";
import {ContactUs} from "./components/contact-us";
import {Main} from "./components/main";
import {Mission} from "./components/mission";
import {News} from "./components/news";
import {NewsPage} from "./components/news/news-page";
import {NoMatchRoute} from "./components/no-match-route";
import {Price} from "./components/price";
import {InternetExplorerPlug} from './components/ie-plug';
import {Wrapper} from "./wrapper";
import {Authorization, url} from "./components/admin/AuthForm/AuthForm";
import {AdminPanel} from "./components/admin/AdminPanel/AdminPanel";
import {AdminPagesList} from "./components/admin/AdminPagesList/AdminPagesList";
import {AdminPanelSite} from "./components/admin/AdminPanelSite/AdminPanelSite";
import {AdminSettings} from "./components/admin/AdminSettings/AdminSettings";
import {AdminNewsPage} from "./components/admin/AdminNewsPage/AdminNewsPage";
import {AdminNews} from "./components/admin/AdminNews/AdminNews";
import {Advertising} from "./components/Advertasing/Advertising";
import {Partners} from "./components/Partners/Partners";
import {Integration} from "./components/Partners/screens/Intergation/Integration";
import {Consalting} from "./components/Partners/screens/Consalting/Consalting";
import {WhiteLabel} from "./components/Partners/screens/WhiteLabel/WhiteLabel";
import {IndividualEntrepreneur} from "./components/IndividualEntrepreneur/IndividualEntrepreneur";
import {Shop247} from "./components/Shop247/Shop247";
import {Calculator} from "./components/Calculator/Calculator";
import {useSelector} from "react-redux";
import {AdminLinks} from "./components/admin/AdminLinks/AdminLinks";

export const generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const App = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [navBar, setNavBar] = useState(null);
  const [footerAddLinks, setFooterAddLinks] = useState(null);
  const [othersLinks, setOthersLinks] = useState(null);
  const [footerSocialLinks, setFooterSocialLinks] = useState(null);
  const {language} = useSelector(store => store.localLanguage);
  const location = useLocation();

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--device-height', `${vh}px`);
    window.addEventListener('resize', deviceSize);

    return () => window.removeEventListener('resize', deviceSize);
  }, [])

  useEffect(() => {
    getPageHeadings();
  }, [language]);

  const setLinksDropdown = (dropdown) => {
    return [
      {
        id: generateId(),
        titleRus: 'Зарядка электромобиля',
        titleEng: 'Charging For Electric Cars',
        titleBel: 'Зарадка для электрамабіля',
        type: 'web',
        selected: false,
        subcategories: [
          dropdown.find(c => c.id === 204),
          {
            id: generateId(),
            sideHeadingRus: 'Стоимость зарядки',
            sideHeadingEng: 'Cost of charging',
            sideHeadingBel: 'Кошт зарадкі',
            path: '/price'
          }, ...dropdown.filter(link => {
            if ([24].includes(link.id)) {
              return link;
            }
          }),
          {
            id: generateId(),
            sideHeadingRus: 'Впервые тут? Помогаем зарядиться',
            sideHeadingEng: 'First time here? We help to charge',
            sideHeadingBel: 'Упершыню тут? Дапамагаем зарадзіцца',
            path: '/help'
          },
          {
            id: generateId(),
            sideHeadingRus: 'Скачать приложение для зарядки',
            sideHeadingEng: 'Download the charging app',
            sideHeadingBel: 'Спампаваць дадатак для зарадкі',
            path: '/'
          }
        ]
      },
      {
        id: generateId(),
        titleRus: 'Решения для бизнеса',
        titleEng: 'Business solution',
        titleBel: 'Рашэнне для бізнесу',
        type: 'web',
        selected: false,
        subcategories: [...dropdown.filter(link => {
          if ([25].includes(link.id)) {
            return link;
          }
        }),
        {
          id: generateId(),
          sideHeadingRus: 'Стать партнером',
          sideHeadingEng: 'Become a partner',
          sideHeadingBel: 'Стаць партнёрам',
          path: '/partner'
        },
        {
          id: generateId(),
          sideHeadingRus: 'Рекламные возможности',
          sideHeadingEng: 'Advertising options',
          sideHeadingBel: 'Рэкламныя магчымасці',
          path: '/advertising'
        }]
      },
      {
        id: generateId(),
        titleRus: 'Маланка',
        titleEng: 'Malanka',
        titleBel: 'Маланка',
        type: 'web',
        selected: false,
        subcategories: dropdown.filter(link => {
          if ([26, 27, 28].includes(link.id)) {
            return link;
          }
        })
      },
      {
        id: generateId(),
        titleRus: 'Соглашения',
        titleEng: 'Agreement',
        titleBel: 'Пагадненне',
        type: 'mobile',
        selected: false,
        subcategories: dropdown.filter(c => c.id >= 205 && c.id <= 208)
      },
      {
        id: generateId(),
        titleRus: 'Карта ЭЗС',
        titleEng: 'EV charging stations map',
        titleBel: 'Карта ЭЗС',
        type: 'mobile',
        selected: false,
        subcategories: dropdown.filter(c => c.id >= 209 && c.id <= 214)
      }
    ];
  }

  const setLinksFooter = (dropdown) => {
    return [
      {
        id: generateId(),
        titleRus: 'Зарядка электромобиля',
        titleEng: 'Charging For Electric Cars',
        titleBel: 'Зарадка для электрамабіля',
        type: 'web',
        selected: false,
        subcategories: [
          dropdown.find(c => c.id === 204),
          {
            id: generateId(),
            pageHeadingRus: 'Стоимость зарядки',
            pageHeadingEng: 'Cost of charging',
            pageHeadingBel: 'Кошт зарадкі',
            path: '/price'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Впервые тут? Помогаем зарядиться',
            pageHeadingEng: 'First time here? We help to charge',
            pageHeadingBel: 'Упершыню тут? Дапамагаем зарадзіцца',
            path: '/help'
          }]
      },
      {
        id: generateId(),
        titleRus: 'Решения для бизнеса',
        titleEng: 'Business solution',
        titleBel: 'Рашэнне для бізнесу',
        type: 'web',
        selected: false,
        subcategories: [
          {
            id: generateId(),
            pageHeadingRus: 'Маланка для юридических лиц',
            pageHeadingEng: 'Malanka for legal entities',
            pageHeadingBel: 'Маланка для юрыдычных асоб',
            path: '/individual'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Стать партнером',
            pageHeadingEng: 'Become a partner',
            pageHeadingBel: 'Стаць партнёрам',
            path: '/partner'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Рекламные возможности',
            pageHeadingEng: 'Advertising options',
            pageHeadingBel: 'Рэкламныя магчымасці',
            path: '/advertising'
          }]
      },
      {
        id: generateId(),
        titleRus: 'Маланка',
        titleEng: 'Malanka',
        titleBel: 'Маланка',
        type: 'web',
        selected: false,
        subcategories: dropdown.filter(link => {
          if ([26, 27, 28].includes(link.id)) {
            return link;
          }
        })
      },
      {
        id: generateId(),
        titleRus: 'Соглашения',
        titleEng: 'Agreement',
        titleBel: 'Пагадненне',
        type: 'mobile',
        selected: false,
        subcategories: dropdown.filter(c => c.id >= 205 && c.id <= 208)
      },
      {
        id: generateId(),
        titleRus: 'Карта ЭЗС',
        titleEng: 'EV charging stations map',
        titleBel: 'Карта ЭЗС',
        type: 'mobile',
        selected: false,
        subcategories: dropdown.filter(c => c.id >= 209 && c.id <= 214)
      }
    ];
  }

  const getPageHeadings = async () => {
    await fetch(`${url}/page-heading`)
      .then(response => response.json())
      .then(result => {
        fetch(`${url}/side-heading`)
          .then(response => response.json())
          .then(res => {
            result.splice(0, 1, result[result.length - 1]);
            setNavBar({
              header: result.slice(0, -1),
              footerNav: setLinksFooter(res),
              dropdown: setLinksDropdown(res)
            });
            setFooterAddLinks(res.filter(c => c.id >= 215 && c.id <= 216));
            setFooterSocialLinks(res.filter(c => c.id >= 226));
            setOthersLinks(res.filter(c => c.id >= 204 && c.id <= 216));
          })
      })
  }

  const getSideHeadings = async () => {
    await fetch(`${url}/side-heading`)
      .then(response => response.json())
      .then(result => {
        setNavBar({
          ...navBar,
          dropdown: setLinksDropdown(result)
        })
      })
  }

  const deviceSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--device-height', `${vh}px`);
    setInnerWidth(window.innerWidth);
  }

  return (
    <>
      {browserName !== 'Trident' &&
        <div className='wrapper'>
          <Routes>
            <Route path='*' element={<Wrapper location={location} innerWidth={innerWidth} navBar={navBar} footerAddLinks={footerAddLinks} footerSocialLinks={footerSocialLinks} />} />
            <Route path='/admin' exact element={<Authorization />} />
            <Route path='/admin/:login' element={<AdminPanel />}>
              <Route path='/admin/:login' element={<AdminPanelSite innerWidth={innerWidth} navBar={navBar} footerAddLinks={footerAddLinks} footerSocialLinks={footerSocialLinks} />}>
                <Route index element={<Main />} />
                <Route path='article-create' element={<AdminNewsPage {...location} innerWidth={innerWidth} />} />
                <Route path='news/:id' element={<NewsPage {...location} innerWidth={innerWidth} />} />
                <Route path='help' element={<Charging />} />
                <Route path='contact-us' element={<ContactUs />} />
                <Route path='our-mission' element={<Mission />} />
                <Route path='price' element={<Price innerWidth={innerWidth} />} />
                <Route path='advertising' element={<Advertising />} />
                <Route path='partner' element={<Partners />} />
                <Route path='partner/integration' element={<Integration />} />
                <Route path='partner/consalting' element={<Consalting />} />
                <Route path='partner/white-label' element={<WhiteLabel />} />
                <Route path='individual' element={<IndividualEntrepreneur />} />
                <Route path='shop247' element={<Shop247 innerWidth={innerWidth} />} />
                <Route path='calculator' element={<Calculator innerWidth={innerWidth} />} />
              </Route>
              <Route path='pages' element={<AdminPagesList />} />
              <Route path='settings' element={<AdminSettings />} />
              <Route path='links' element={<AdminLinks othersLinks={othersLinks} footerSocialLinks={footerSocialLinks} />} />
              <Route path='*' element={<NoMatchRoute />} />
              <Route path='news' element={<AdminNews innerWidth={innerWidth} />} />
            </Route>
          </Routes>
        </div>
      }
      {browserName === 'Trident' &&
        <InternetExplorerPlug />
      }
    </>
  );
}

export default App;
