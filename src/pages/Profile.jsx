import React, { useState, useEffect } from 'react';
import { Divider, Steps, Anchor, Row, Col } from 'antd';
import { Progress } from "@/components/ui/progress"
import PersonalData from './form-profile/PersonalData';
import Contacts from './form-profile/Contacts';
import Address from './form-profile/Address';
import Profession from './form-profile/Profession';
import Training from './form-profile/Training';
import './pages.css';

let item_menu = [
  { status: 'process', title: 'Dados Pessoais' },
  { status: 'wait', title: 'Contatos' },
  { status: 'wait', title: 'Endereco' },
  { status: 'wait', title: 'Profissao' },
  { status: 'wait', title: 'Formacao' }
];

const updateItemMenuStatus = (index, newStatus) => {
  if (index >= 0 && index < item_menu.length) {
    item_menu[index].status = newStatus;
  }
};

export default function Profile(){
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  const onChange = (value) => {
    setCurrent(value);
  };


  return (
    <>
      <div className='progresso'>
        <h1>Seu Perfil: </h1>
        <Progress value={progress} />
      </div>
      <Steps
        items={item_menu}
        onChange={onChange}
        current={current}
        type="navigation"
        className="site-navigation-steps"
      />
      {current === 0 && <PersonalData />}
      {current === 1 && <Contacts />}
      {current === 2 && <Address />}
      {current === 3 && <Profession />}
      {current === 4 && <Training />}
    </>
  )
}
export { item_menu, updateItemMenuStatus };