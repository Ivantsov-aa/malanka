import { useEffect, useState } from "react";
import { browserName } from "react-device-detect";
import { Route, Routes, useLocation } from "react-router-dom";
import { Charging } from "./components/charging";
import { ContactUs } from "./components/contact-us";
import { Main } from "./components/main";
import { Mission } from "./components/mission";
import { News } from "./components/news";
import { NewsPage } from "./components/news/news-page";
import { NoMatchRoute } from "./components/no-match-route";
import { Price } from "./components/price";
import { InternetExplorerPlug } from './components/ie-plug';
import { Wrapper } from "./wrapper";
import { Authorization } from "./components/admin/AuthForm/AuthForm";
import { AdminPanel } from "./components/admin/AdminPanel/AdminPanel";
import { AdminPagesList } from "./components/admin/AdminPagesList/AdminPagesList";
import { AdminPanelSite } from "./components/admin/AdminPanelSite/AdminPanelSite";
import { AdminSettings } from "./components/admin/AdminSettings/AdminSettings";
import { AdminNewsPage } from "./components/admin/AdminNewsPage/AdminNewsPage";
import { AdminNews } from "./components/admin/AdminNews/AdminNews";
import { Advertising } from "./components/Advertasing/Advertising";
import { Partners } from "./components/Partners/Partners";
import { Integration } from "./components/Partners/screens/Intergation/Integration";
import { Consalting } from "./components/Partners/screens/Consalting/Consalting";
import { WhiteLabel } from "./components/Partners/screens/WhiteLabel/WhiteLabel";
import { IndividualEntrepreneur } from "./components/IndividualEntrepreneur/IndividualEntrepreneur";
import { Shop247 } from "./components/Shop247/Shop247";
import { Calculator } from "./components/Calculator/Calculator";
import { useSelector } from "react-redux";

const generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const App = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [navBar, setNavBar] = useState(null);
  const { language } = useSelector(store => store.localLanguage);
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
        subcategories: dropdown.filter(link => {
          if ([83, 51, 73, 78, 84].includes(link.id)) {
            return link;
          }
        })
      },
      {
        id: generateId(),
        titleRus: 'Решения для бизнеса',
        titleEng: 'Business solution',
        titleBel: 'Рашэнне для бізнесу',
        type: 'web',
        selected: false,
        subcategories: dropdown.filter(link => {
          if ([69, 55, 61].includes(link.id)) {
            return link;
          }
        })
      },
      {
        id: generateId(),
        titleRus: 'Маланка',
        titleEng: 'Malanka',
        titleBel: 'Маланка',
        type: 'web',
        selected: false,
        subcategories: dropdown.filter(link => {
          if ([65, 85, 73].includes(link.id)) {
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
        subcategories: [
          {
            id: generateId(),
            pageHeadingRus: 'Публичная оферта для физ. лиц',
            pageHeadingEng: 'Public offer for individuals',
            pageHeadingBel: 'Публічная аферта для фіз. асоб',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Публичный договор для юр. лиц',
            pageHeadingEng: 'Public offer for legal entities',
            pageHeadingBel: 'Публічны дагавор для юр. асоб',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Правила пользования',
            pageHeadingEng: 'Terms of use',
            pageHeadingBel: 'Правілы карыстання',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Соглашение об оплате',
            pageHeadingEng: 'Payment agreement',
            pageHeadingBel: 'Пагадненне аб аплаце',
            path: '/'
          }
        ]
      },
      {
        id: generateId(),
        titleRus: 'Карта ЭЗС',
        titleEng: 'EV charging stations map',
        titleBel: 'Карта ЭЗС',
        type: 'mobile',
        selected: false,
        subcategories: [
          {
            id: generateId(),
            pageHeadingRus: 'Минск',
            pageHeadingEng: 'Minsk',
            pageHeadingBel: 'Мінск',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Гомель',
            pageHeadingEng: 'Gomel',
            pageHeadingBel: 'Гомель',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Гродно',
            pageHeadingEng: 'Grodno',
            pageHeadingBel: 'Гродна',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Брест',
            pageHeadingEng: 'Brest',
            pageHeadingBel: 'Брэст',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Витебск',
            pageHeadingEng: 'Vitebsk',
            pageHeadingBel: 'Віцебск',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Могилев',
            pageHeadingEng: 'Mogilev',
            pageHeadingBel: 'Магілёў',
            path: '/'
          },
        ]
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
        subcategories: dropdown.filter(link => {
          if ([83, 51, 79].includes(link.id)) {
            return link;
          }
        })
      },
      {
        id: generateId(),
        titleRus: 'Решения для бизнеса',
        titleEng: 'Business solution',
        titleBel: 'Рашэнне для бізнесу',
        type: 'web',
        selected: false,
        subcategories: dropdown.filter(link => {
          if ([69, 55, 61].includes(link.id)) {
            return link;
          }
        })
      },
      {
        id: generateId(),
        titleRus: 'Маланка',
        titleEng: 'Malanka',
        titleBel: 'Маланка',
        type: 'web',
        selected: false,
        subcategories: dropdown.filter(link => {
          if ([65, 85, 73].includes(link.id)) {
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
        subcategories: [
          {
            id: generateId(),
            pageHeadingRus: 'Публичная оферта для физ. лиц',
            pageHeadingEng: 'Public offer for individuals',
            pageHeadingBel: 'Публічная аферта для фіз. асоб',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Публичный договор для юр. лиц',
            pageHeadingEng: 'Public offer for legal entities',
            pageHeadingBel: 'Публічны дагавор для юр. асоб',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Правила пользования',
            pageHeadingEng: 'Terms of use',
            pageHeadingBel: 'Правілы карыстання',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Соглашение об оплате',
            pageHeadingEng: 'Payment agreement',
            pageHeadingBel: 'Пагадненне аб аплаце',
            path: '/'
          }
        ]
      },
      {
        id: generateId(),
        titleRus: 'Карта ЭЗС',
        titleEng: 'EV charging stations map',
        titleBel: 'Карта ЭЗС',
        type: 'mobile',
        selected: false,
        subcategories: [
          {
            id: generateId(),
            pageHeadingRus: 'Минск',
            pageHeadingEng: 'Minsk',
            pageHeadingBel: 'Мінск',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Гомель',
            pageHeadingEng: 'Gomel',
            pageHeadingBel: 'Гомель',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Гродно',
            pageHeadingEng: 'Grodno',
            pageHeadingBel: 'Гродна',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Брест',
            pageHeadingEng: 'Brest',
            pageHeadingBel: 'Брэст',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Витебск',
            pageHeadingEng: 'Vitebsk',
            pageHeadingBel: 'Віцебск',
            path: '/'
          },
          {
            id: generateId(),
            pageHeadingRus: 'Могилев',
            pageHeadingEng: 'Mogilev',
            pageHeadingBel: 'Магілёў',
            path: '/'
          },
        ]
      }
    ];
  }

  const getPageHeadings = async () => {
    fetch('http://89.223.71.123:8080/malanka/page-heading')
      .then(response => response.json())
      .then(result => {
        const topBar = result.filter(link => [79, 51, 55, 61].includes(link.id));
        const lastBar = topBar.pop();

        setNavBar({
          header: [lastBar, ...topBar],
          dropdown: setLinksDropdown(result),
          footerNav: setLinksFooter(result)
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
            <Route path='*' element={<Wrapper location={location} innerWidth={innerWidth} navBar={navBar} />} />
            <Route path='/admin' exact element={<Authorization />} />
            <Route path='/admin/:login' element={<AdminPanel />}>
              <Route path='/admin/:login' element={<AdminPanelSite innerWidth={innerWidth} navBar={navBar} />}>
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
