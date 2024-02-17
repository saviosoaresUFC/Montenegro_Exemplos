import React, { useState } from 'react'
import {
  Form, Input, Select,
  DatePicker, Divider, Collapse,
  Button, Upload
} from 'antd';
import InputMask from 'react-input-mask';
import { MdDone } from "react-icons/md";
import { updateItemMenuStatus } from '../Profile';
import ImgCrop from 'antd-img-crop';
import UploadProfile from '../../components/uploadProfile';
const { Option } = Select;

const paises_mundiais = [
  { name: 'Afeganistão' }, { name: 'África do Sul' }, { name: 'Albânia' }, { name: 'Alemanha' }, { name: 'Andorra' },
  { name: 'Angola' }, { name: 'Antartida' }, { name: 'Antigua' }, { name: 'Antilhas Holandesas' }, { name: 'Arábia Saudita' },
  { name: 'Argélia' }, { name: 'Argentina' }, { name: 'Armênia' }, { name: 'Austrália' }, { name: 'Austria' },
  { name: 'Azerbaijão' }, { name: 'Bahamas' }, { name: 'Bangladesh' }, { name: 'Barbados' }, { name: 'Barein' },
  { name: 'Belarus' }, { name: 'Bélgica' }, { name: 'Belize' }, { name: 'Benin' }, { name: 'Bermudas' },
  { name: 'Birmânia' }, { name: 'Bolívia' }, { name: 'Bósnia' }, { name: 'Botsuana' }, { name: 'Brasil' },
  { name: 'Britsh Indian Ocean' }, { name: 'Brunei' }, { name: 'Bulgária' }, { name: 'Burkina Fasso' }, { name: 'Burundi' },
  { name: 'Butão' }, { name: 'Cabo Verde' }, { name: 'Camarões' }, { name: 'Camboja' }, { name: 'Canadá' },
  { name: 'Catar' }, { name: 'Cazaquistão' }, { name: 'Chade' }, { name: 'Chile' }, { name: 'China' },
  { name: 'Chipre' }, { name: 'Christmas Island' }, { name: 'Cingapura' }, { name: 'Colômbia' }, { name: 'Comores' },
  { name: 'Congo' }, { name: 'Coréia do Norte' }, { name: 'Coréia do Sul' }, { name: 'Costa do Marfim' }, { name: 'Costa Rica' },
  { name: 'Croácia' }, { name: 'Cuba' }, { name: 'Dinamarca' }, { name: 'Djibuti' }, { name: 'Dominica' },
  { name: 'Egito' }, { name: 'El Salvador' }, { name: 'Emirados Árabes' }, { name: 'Equador' }, { name: 'Eritréa' },
  { name: 'Escócia' }, { name: 'Eslováquia' }, { name: 'Eslovênia' }, { name: 'Espanha' }, { name: 'Estados Unidos' },
  { name: 'Estônia' }, { name: 'Etiópia' }, { name: 'Fiji' }, { name: 'Filipinas' }, { name: 'Finlândia' },
  { name: 'Formosa' }, { name: 'França' }, { name: 'Gabão' }, { name: 'Gales' }, { name: 'Gâmbia' },
  { name: 'Gana' }, { name: 'Geórgia' }, { name: 'Gibraltar' }, { name: 'Grã- Bretanha' }, { name: 'Granada' },
  { name: 'Grécia' }, { name: 'Groênlandia' }, { name: 'Guadalupe' }, { name: 'Guam' }, { name: 'Guatemala' },
  { name: 'Guiana' }, { name: 'Guiana Francesa' }, { name: 'Guiné' }, { name: 'Guiné Bissau' }, { name: 'Guiné Equatorial' },
  { name: 'Haiti' }, { name: 'Holanda' }, { name: 'Honduras' }, { name: 'Hong Kong' }, { name: 'Hungria' },
  { name: 'Iêmem' }, { name: 'Iêmen do Sul' }, { name: 'Ilhas Cayman' }, { name: 'Ilhas Cocos' }, { name: 'Ilhas Cook' },
  { name: 'Ilhas Falkland' }, { name: 'Ilhas Faroe' }, { name: 'Ilhas Marshall' }, { name: 'Ilhas Midway' }, { name: 'Ilhas Norfolk' },
  { name: 'Ilhas Salomão' }, { name: 'Ilhas Santa Helena' }, { name: 'Ilhas Turcas Caicos' }, { name: 'Ilhas Vírgens EUA' }, { name: 'Ilhas Vírgens GBR' },
  { name: 'Ilhas Wake' }, { name: 'Ilhas Wallis Futuna' }, { name: 'Índia' }, { name: 'Indonésia' }, { name: 'Inglaterra' },
  { name: 'Irã' }, { name: 'Iraque' }, { name: 'Irlanda' }, { name: 'Irlanda do Norte' }, { name: 'Islândia' },
  { name: 'Israel' }, { name: 'Itália' }, { name: 'Iugoslávia' }, { name: 'Jamaica' }, { name: 'Japão' },
  { name: 'Jordânia' }, { name: 'Kiribati' }, { name: 'Kuweit' }, { name: 'Laos' }, { name: 'Lesoto' },
  { name: 'Letônia' }, { name: 'Líbano' }, { name: 'Libéria' }, { name: 'Líbia' }, { name: 'Liechtenstein' },
  { name: 'Lituânia' }, { name: 'Luxemburgo' }, { name: 'Macau' }, { name: 'Macedônia' }, { name: 'Madagascar' },
  { name: 'Malásia' }, { name: 'Malavi' }, { name: 'Maldivas' }, { name: 'Mali' }, { name: 'Malta' },
  { name: 'Marrocos' }, { name: 'Martinica' }, { name: 'Maurício' }, { name: 'Mauritânia' }, { name: 'México' },
  { name: 'Mianmar' }, { name: 'Micronésia' }, { name: 'Moçambique' }, { name: 'Moldova' }, { name: 'Mônaco' },
  { name: 'Mongólia' }, { name: 'Montserrat' }, { name: 'Namíbia' }, { name: 'Não informado' }, { name: 'Nauru' },
  { name: 'Nepal' }, { name: 'Nicarágua' }, { name: 'Niger' }, { name: 'Nigéria' }, { name: 'Niue' },
  { name: 'Noruega' }, { name: 'Nova Caledônia' }, { name: 'Nova Zelândia' }, { name: 'Omã' }, { name: 'Pacific Islands' },
  { name: 'Palau' }, { name: 'Panamá' }, { name: 'Papua Nova Guiné' }, { name: 'Paquistão' }, { name: 'Paraguai' },
  { name: 'Peru' }, { name: 'Pitcairn' }, { name: 'Polinésia Francesa' }, { name: 'Polônia' }, { name: 'Porto Rico' },
  { name: 'Portugal' }, { name: 'Quênia' }, { name: 'Quirgistão' }, { name: 'Rep.Centro - Africana' }, { name: 'República Dominicana' },
  { name: 'República Tcheca' }, { name: 'República Tcheca' }, { name: 'Reunião' }, { name: 'Romênia' }, { name: 'Ruanda' },
  { name: 'Rússia' }, { name: 'Samoa Americana' }, { name: 'Samoa Ocidental' }, { name: 'San Marino' }, { name: 'Santa Lúcia' },
  { name: 'São Cristóvão Nevis' }, { name: 'São Pedro Miquelon' }, { name: 'São Tomé e Príncipe' }, { name: 'São Vicente Granadi' }, { name: 'Senegal' },
  { name: 'Serra Leoa' }, { name: 'Seychelles' }, { name: 'Síria' }, { name: 'Somália' }, { name: 'Sri Lanka' },
  { name: 'Suazilândia' }, { name: 'Sudão' }, { name: 'Suécia' }, { name: 'Suiça' }, { name: 'Suriname' },
  { name: 'Tadjaquistão' }, { name: 'Tailândia' }, { name: 'Tanzânia' }, { name: 'Timor' }, { name: 'Togo' },
  { name: 'Tokelau' }, { name: 'Tonga' }, { name: 'Trinidad e Tobago' }, { name: 'Tunísia' }, { name: 'Turcomenistão' },
  { name: 'Turquia' }, { name: 'Tuvalu' }, { name: 'Ucrânia' }, { name: 'Uganda' }, { name: 'União Soviética' },
  { name: 'Uruguai' }, { name: 'Uzbekistan' }, { name: 'Vanuatu' }, { name: 'Vaticano' }, { name: 'Venezuela' },
  { name: 'Vietnã' }, { name: 'Western Sahara' }, { name: 'Zaire' }, { name: 'Zâmbia' }, { name: 'Zimbabue' },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const siglas_estados_brasileiros = [
  { sigla: 'AC', extenso: 'Acre' }, { sigla: 'AL', extenso: 'Alagoas' }, { sigla: 'AP', extenso: 'Amapá' },
  { sigla: 'AM', extenso: 'Amazonas' }, { sigla: 'BA', extenso: 'Bahia' }, { sigla: 'CE', extenso: 'Ceará' },
  { sigla: 'DF', extenso: 'Distrito Federal' }, { sigla: 'ES', extenso: 'Espírito Santo' }, { sigla: 'GO', extenso: 'Goiás' },
  { sigla: 'MA', extenso: 'Maranhão' }, { sigla: 'MT', extenso: 'Mato Grosso' }, { sigla: 'MS', extenso: 'Mato Grosso do Sul' },
  { sigla: 'MG', extenso: 'Minas Gerais' }, { sigla: 'PA', extenso: 'Pará' }, { sigla: 'PB', extenso: 'Paraíba' },
  { sigla: 'PR', extenso: 'Paraná' }, { sigla: 'PE', extenso: 'Pernambuco' }, { sigla: 'PI', extenso: 'Piauí' },
  { sigla: 'RJ', extenso: 'Rio de Janeiro' }, { sigla: 'RN', extenso: 'Rio Grande do Norte' }, { sigla: 'RS', extenso: 'Rio Grande do Sul' },
  { sigla: 'RO', extenso: 'Rondônia' }, { sigla: 'RR', extenso: 'Roraima' }, { sigla: 'SC', extenso: 'Santa Catarina' },
  { sigla: 'SP', extenso: 'São Paulo' }, { sigla: 'SE', extenso: 'Sergipe' }, { sigla: 'TO', extenso: 'Tocantins' },
];

export default function PersonalData() {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  const orgaos_emissores = [
    { sigla: 'ABNC', extenso: 'Academia Brasileira de Neurocirurgia' }, { sigla: 'AGU', extenso: 'Advocacia-Geral da União' },
    { sigla: 'ANAC', extenso: 'Agência Nacional de Aviação Civil' }, { sigla: 'CAER', extenso: 'Clube de Aeronáutica' },
    { sigla: 'CAU', extenso: 'Conselho de Arquitetura e Urbanismo' }, { sigla: 'CBM', extenso: 'Corpo de Bombeiro Militar' },
    { sigla: 'CFA', extenso: 'Conselho Federal Administração' }, { sigla: 'CFB', extenso: 'Conselho Federal de Biblioteconomia' },
    { sigla: 'CFBIO', extenso: 'Conselho Federal de Biologia' }, { sigla: 'CFBM', extenso: 'Conselho Federal de Biomedicina' },
    { sigla: 'CFC', extenso: 'Conselho Federal de Contabilidade' }, { sigla: 'CFESS', extenso: 'Conselho Federal de Serviço Social' },
    { sigla: 'CFF', extenso: 'Conselho Regional de Farmácia' }, { sigla: 'CFFA', extenso: 'Conselho Federal de Fonoaudiologia' },
    { sigla: 'CFM', extenso: 'Conselho Federal de Medicina' }, { sigla: 'CFMV', extenso: 'Conselho Federal de Medicina Veterinária' },
    { sigla: 'CFN', extenso: 'Conselho Federal de Nutrição' }, { sigla: 'CFO', extenso: 'Conselho Federal de Odontologia' },
    { sigla: 'CFP', extenso: 'Conselho Federal de Psicologia' }, { sigla: 'CFQ', extenso: 'Conselho Regional de Química' },
    { sigla: 'CFT', extenso: 'Conselho Federal dos Técnicos Industriais' }, { sigla: 'CFTA', extenso: 'Conselho Federal dos Técnicos Agrícolas' },
    { sigla: 'CGPI', extenso: 'Coordenação Geral de Privilégios e Imunidades' }, { sigla: 'CGPMAF', extenso: 'Coordenadoria Geral de Polícia Marítima, Aeronáutica e de Fronteiras' },
    { sigla: 'CIPC', extenso: 'Centro de Inteligência da Polícia Civil' }, { sigla: 'CNIG', extenso: 'Conselho Nacional de Imigração' },
    { sigla: 'CNT', extenso: 'Confederação Nacional do Transporte' }, { sigla: 'CNTV', extenso: 'Confederação Nacional de Vigilantes & Prestadores de Serviços' },
    { sigla: 'COFECI', extenso: 'Conselho Federal de Corretores de Imóveis' }, { sigla: 'COFECON', extenso: 'Conselho Federal de Economia' },
    { sigla: 'COFEM', extenso: 'Conselho Federal de Museologia' }, { sigla: 'COFEN', extenso: 'Conselho Federal de Enfermagem' },
    { sigla: 'COFFITO', extenso: 'Conselho Regional de Fisioterapia e Terapia Ocupacional' }, { sigla: 'COMAER', extenso: 'Comando da Aeronáutica' },
    { sigla: 'CONFE', extenso: 'Conselho Federal de Estatística' }, { sigla: 'CONFEA', extenso: 'Conselho Federal de Engenharia e Agronomia' },
    { sigla: 'CONFEF', extenso: 'Conselho Federal de Educação Física' }, { sigla: 'CONFERE', extenso: 'Conselho Federal dos Representantes Comerciais' },
    { sigla: 'CONRE', extenso: 'Conselho Regional de Estatística' }, { sigla: 'CONRERP', extenso: 'Conselho Federal de Profissionais de Relações Públicas' },
    { sigla: 'CORE', extenso: 'Conselho Regional dos Representantes Comerciais' }, { sigla: 'CORECON', extenso: 'Conselho Regional de Economia' },
    { sigla: 'COREM', extenso: 'Conselho Regional de Museologia' }, { sigla: 'COREN', extenso: 'Conselho Regional de Enfermagem' },
    { sigla: 'CRA', extenso: 'Conselho Regional de Administração' }, { sigla: 'CRAS', extenso: 'Centro de Referência de Assistência Social' },
    { sigla: 'CRB', extenso: 'Conselho Regional de Biblioteconomia' }, { sigla: 'CRBIO', extenso: 'Conselho Regional de Biologia' },
    { sigla: 'CRBM', extenso: 'Conselho Regional de Biomedicina' }, { sigla: 'CRC', extenso: 'Conselho Regional de Contabilidade' },
    { sigla: 'CREA', extenso: 'Conselho Regional de Engenharia e Agronomia' }, { sigla: 'CRECI', extenso: 'Conselho Regional de Corretores de Imóveis' },
    { sigla: 'CREF', extenso: 'Conselho Regional de Educação Física' }, { sigla: 'CREFITO', extenso: 'Conselho Regional de Fisioterapia e Terapia Ocupacional' },
    { sigla: 'CRESS', extenso: 'Conselho Regional de Serviço Social' }, { sigla: 'CRF', extenso: 'Conselho Regional de Farmácia' },
    { sigla: 'CRFA', extenso: 'Conselho Regional de Fonoaudiologia' }, { sigla: 'CRM', extenso: 'Conselho Regional de Medicina' },
    { sigla: 'CRMV', extenso: 'Conselho Regional de Medicina Veterinária' }, { sigla: 'CRN', extenso: 'Conselho Regional de Nutrição' },
    { sigla: 'CRO', extenso: 'Conselho Regional de Odontologia' }, { sigla: 'CRP', extenso: 'Conselho Regional de Psicologia' },
    { sigla: 'CRPRE', extenso: 'Conselho Regional de Profissionais de Relações Públicas' }, { sigla: 'CRQ', extenso: 'Conselho Regional de Química' },
    { sigla: 'CRT', extenso: 'Conselho Regional dos Técnicos Industriais' }, { sigla: 'CRTA', extenso: 'Conselho Regional de Técnicos de Administração' },
    { sigla: 'CTPS', extenso: 'Carteira de Trabalho e Previdência Social' }, { sigla: 'CV', extenso: 'Cartório Civil' },
    { sigla: 'DELEMIG', extenso: 'Delegacia de Polícia de Imigração' }, { sigla: 'DETRAN', extenso: 'Departamento Estadual de Trânsito' },
    { sigla: 'DGPC', extenso: 'Diretoria Geral da Polícia Civil' }, { sigla: 'DIC', extenso: 'Diretoria de Identificação Civil' },
    { sigla: 'DICC', extenso: 'Diretoria de Identificação Civil e Criminal' }, { sigla: 'DIREX', extenso: 'Diretoria Executiva' },
    { sigla: 'DPF', extenso: 'Departamento de Polícia Federal' }, { sigla: 'DPMAF', extenso: 'Divisão de Polícia Marítima, Aérea e de Fronteiras' },
    { sigla: 'DPT', extenso: 'Departamento de Polícia Técnica Geral' }, { sigla: 'DPTC', extenso: 'Departamento de Polícia Técnico Científica' },
    { sigla: 'DREX', extenso: 'Delegacia Regional Executiva' }, { sigla: 'DRT', extenso: 'Delegacia Regional do Trabalho' },
    { sigla: 'EB', extenso: 'Exército Brasileiro' }, { sigla: 'FAB', extenso: 'Força Aérea Brasileira' },
    { sigla: 'FENAJ', extenso: 'Federação Nacional dos Jornalistas' }, { sigla: 'FGTS', extenso: 'Fundo de Garantia do Tempo de Serviço' },
    { sigla: 'FIPE', extenso: 'Fundação Instituto de Pesquisas Econômicas' }, { sigla: 'FLS', extenso: 'Fundação Lyndolpho Silva' },
    { sigla: 'FUNAI', extenso: 'Fundação Nacional do Índio' }, { sigla: 'GEJSP', extenso: 'Gerência de Estado de Justiça, Segurança Pública e Cidadania' },
    { sigla: 'GEJSPC', extenso: 'Gerência de Estado de Justiça, Segurança Pública e Cidadania' }, { sigla: 'GEJUSPC', extenso: 'Gerência de Estado de Justiça, Segurança Pública e Cidadania' },
    { sigla: 'GESP', extenso: 'Gerência de Estado de Segurança Pública' }, { sigla: 'GOVGO', extenso: 'Governo do Estado de Goiás' },
    { sigla: 'I CLA', extenso: 'Carteira de Identidade Classista' }, { sigla: 'ICP', extenso: 'Instituto de Polícia Científica' },
    { sigla: 'IDAMP', extenso: 'Instituto de Identificação Dr. Aroldo Mendes Paiva' }, { sigla: 'IFP', extenso: 'Instituto Félix Pacheco' },
    { sigla: 'IGP', extenso: 'Instituto Geral de Perícias' }, { sigla: 'IIACM', extenso: 'Instituto de Identificação Aderson Conceição de Melo' },
    { sigla: 'IICC', extenso: 'Instituto de Identificação Civil e Criminal' }, { sigla: 'IICCECF', extenso: 'Instituto de Identificação Civil e Criminal Engrácia da Costa Francisco' },
    { sigla: 'IICM', extenso: 'Instituto de Identificação Carlos Menezes' }, { sigla: 'IIGP', extenso: 'Instituto de Identificação Gonçalo Pereira' },
    { sigla: 'IIJDM', extenso: 'Instituto de Identificação João de Deus Martins' }, { sigla: 'IIPC', extenso: 'Instituto de Identificação da Polícia Civil' },
    { sigla: 'IIPC', extenso: 'Instituto de Identificação Pedro Mello' }, { sigla: 'IIRGD', extenso: 'Instituto de Identificação Ricardo Gumbleton Daunt' },
    { sigla: 'IIRHM', extenso: 'Instituto de Identificação Raimundo Hermínio de Melo' }, { sigla: 'IITB', extenso: 'Instituto de Identificação Tavares Buril' },
    { sigla: 'IML', extenso: 'Instituto Médico-Legal' }, { sigla: 'INI', extenso: 'Instituto Nacional de Identificação' },
    { sigla: 'IPF', extenso: 'Instituto Pereira Faustino' }, { sigla: 'ITCP', extenso: 'Instituto Técnico-Científico de Perícia' },
    { sigla: 'ITEP', extenso: 'Instituto Técnico-Científico de Perícia' }, { sigla: 'MAER', extenso: 'Ministério da Aeronáutica' },
    { sigla: 'MB', extenso: 'Marinha do Brasil' }, { sigla: 'MD', extenso: 'Ministério da Defesa' },
    { sigla: 'MDS', extenso: 'Ministério da Cidadania' }, { sigla: 'MEC', extenso: 'Ministério da Educação e Cultura' },
    { sigla: 'MEX', extenso: 'Ministério do Exército' }, { sigla: 'MINDEF', extenso: 'Ministério da Defesa' },
    { sigla: 'MJ', extenso: 'Ministério da Justiça' }, { sigla: 'MM', extenso: 'Ministério da Marinha' },
    { sigla: 'MMA', extenso: 'Ministério da Marinha' }, { sigla: 'MPAS', extenso: 'Ministério da Previdência e Assistência Social' },
    { sigla: 'MPE', extenso: 'Ministério Público Estadual' }, { sigla: 'MPF', extenso: 'Ministério Público Federal' },
    { sigla: 'MPT', extenso: 'Ministério Público do Trabalho' }, { sigla: 'MRE', extenso: 'Ministério das Relações Exteriores' },
    { sigla: 'MT', extenso: 'Ministério do Trabalho' }, { sigla: 'MTE', extenso: 'Ministério da Economia' },
    { sigla: 'MTPS', extenso: 'Ministério do Trabalho e Previdência Social' }, { sigla: 'NUMIG', extenso: 'Núcleo de Polícia de Imigração' },
    { sigla: 'OAB', extenso: 'Ordem dos Advogados do Brasil' }, { sigla: 'OMB', extenso: 'Ordens dos Músicos do Brasil' },
    { sigla: 'PC', extenso: 'Polícia Civil' }, { sigla: 'PF', extenso: 'Polícia Federal' },
    { sigla: 'PGFN', extenso: 'Procuradoria Geral da Fazenda Nacional' }, { sigla: 'PM', extenso: 'Polícia Militar' },
    { sigla: 'POLITEC', extenso: 'Perícia Oficial e Identificação Técnica' }, { sigla: 'PRF', extenso: 'Polícia Rodoviária Federal' },
    { sigla: 'PTC', extenso: 'Polícia Tecnico-Científica' }, { sigla: 'SCC', extenso: 'Secretaria de Estado da Casa Civil' },
    { sigla: 'SCJDS', extenso: 'Secretaria Coordenadora de Justiça e Defesa Social' }, { sigla: 'SDS', extenso: 'Secretaria de Defesa Social' },
    { sigla: 'SECC', extenso: 'Secretaria de Estado da Casa Civil' }, { sigla: 'SECCDE', extenso: 'Secretaria de Estado da Casa Civil e Desenvolvimento Econômico' },
    { sigla: 'SEDS', extenso: 'Secretaria de Estado da Defesa Social' }, { sigla: 'SEGUP', extenso: 'Secretaria de Estado da Segurança Pública e da Defesa Social' },
    { sigla: 'SEJSP', extenso: 'Secretaria de Estado de Justiça e Segurança Pública' }, { sigla: 'SEJUC', extenso: 'Secretaria de Estado da Justica' },
    { sigla: 'SEJUSP', extenso: 'Secretaria de Estado de Justiça e Segurança Pública' }, { sigla: 'SEPC', extenso: 'Secretaria de Estado da Polícia Civil' },
    { sigla: 'SES', extenso: 'Secretaria de Estado da Segurança' }, { sigla: 'SESC', extenso: 'Secretaria de Estado da Segurança e Cidadania' },
    { sigla: 'SESDC', extenso: 'Secretaria de Estado da Segurança, Defesa e Cidadania' }, { sigla: 'SESDEC', extenso: 'Secretaria de Estado da Segurança, Defesa e Cidadania' },
    { sigla: 'SESEG', extenso: 'Secretaria Estadual de Segurança' }, { sigla: 'SESP', extenso: 'Secretaria de Estado da Segurança Pública' },
    { sigla: 'SESPAP', extenso: 'Secretaria de Estado da Segurança Pública e Administração Penitenciária' }, { sigla: 'SESPDC', extenso: 'Secretaria de Estado de Segurança Publica e Defesa do Cidadão' },
    { sigla: 'SESPDS', extenso: 'Secretaria de Estado de Segurança Pública e Defesa Social' }, { sigla: 'SGPC', extenso: 'Superintendência Geral de Polícia Civil' },
    { sigla: 'SGPJ', extenso: 'Superintendência Geral de Polícia Judiciária' }, { sigla: 'SIM', extenso: 'Serviço de Identificação da Marinha' },
    { sigla: 'SJ', extenso: 'Secretaria da Justiça' }, { sigla: 'SJCDH', extenso: 'Secretaria da Justiça e dos Direitos Humanos' },
    { sigla: 'SJDS', extenso: 'Secretaria Coordenadora de Justiça e Defesa Social' }, { sigla: 'SJS', extenso: 'Secretaria da Justiça e Segurança' },
    { sigla: 'SJTC', extenso: 'Secretaria da Justiça do Trabalho e Cidadania' }, { sigla: 'SJTS', extenso: 'Secretaria da Justiça do Trabalho e Segurança' },
    { sigla: 'SNJ', extenso: 'Secretaria Nacional de Justiça / Departamento de Estrangeiros' }, { sigla: 'SPMAF', extenso: 'Serviço de Polícia Marítima, Aérea e de Fronteiras' },
    { sigla: 'SPTC', extenso: 'Secretaria de Polícia Técnico-Científica' }, { sigla: 'SRDPF', extenso: 'Superintendência Regional do Departamento de Polícia Federal' },
    { sigla: 'SRF', extenso: 'Receita Federal' }, { sigla: 'SRTE', extenso: 'Superintendência Regional do Trabalho' },
    { sigla: 'SSDC', extenso: 'Secretaria da Segurança, Defesa e Cidadania' }, { sigla: 'SSDS', extenso: 'Secretaria da Segurança e da Defesa Social' },
    { sigla: 'SSI', extenso: 'Secretaria de Segurança e Informações' }, { sigla: 'SSP', extenso: 'Secretaria de Segurança Pública' },
    { sigla: 'SSPCGP', extenso: 'Secretaria de Segurança Pública e Coordenadoria Geral de Perícias' }, { sigla: 'SSPDC', extenso: 'Secretaria de Segurança Pública e Defesa do Cidadão' },
    { sigla: 'SSPDS', extenso: 'Secretaria de Segurança Pública e Defesa Social' }, { sigla: 'SSPPC', extenso: 'Secretaria de Segurança Pública Polícia Civil' },
    { sigla: 'SUSEP', extenso: 'Superintendência de Seguros Privados' }, { sigla: 'SUSEPE', extenso: 'Superintendência dos Serviços Penitenciários' },
    { sigla: 'TJ', extenso: 'Tribunal de Justiça' }, { sigla: 'TJAEM', extenso: 'Tribunal Arbitral e Mediação dos Estados Brasileiros' },
    { sigla: 'TRE', extenso: 'Tribunal Regional Eleitoral' }, { sigla: 'TRF', extenso: 'Tribunal Regional Federal' },
    { sigla: 'TSE', extenso: 'Tribunal Superior Eleitoral' }, { sigla: 'XXX', extenso: 'Orgão Estrangeiro' }, { sigla: 'ZZZ', extenso: 'Outro' },
  ];

  const [value_pais, setValuePais] = useState('Brasil');

  const items = [
    {
      key: '1',
      label: 'Dados Pessoais',
      children: (
        <div>
          <Form.Item
            name="fullname"
            label="Nome Completo"
            rules={
              [
                {
                  required: true,
                  message: 'Por favor, insira seu nome completo!',
                  whitespace: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="data_de_nascimento"
            label="Data de Nascimento"
            type='object'
            message='Please select time!'
            required
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="sexo"
            label="Sexo"
          >
            <Select placeholder="Selecione seu sexo">
              <Option value="Masculino" />
              <Option value="Feminino" />
            </Select>
          </Form.Item>
          <Form.Item
            name="estado_civil"
            label="Estado Civil"
          >
            <Select placeholder="Selecione seu estado civil">
              <Option value="Casado(a)" />
              <Option value="Solteiro(a)" />
              <Option value="Divorciado(a)" />
              <Option value="Separado(a)" />
              <Option value="Viúvo(a)" />
              <Option value="Em união estável" />
            </Select>
          </Form.Item>
          <Form.Item
            name="nacionalidade"
            label="Nacionalidade"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione sua nacionalidade!',
              },
            ]}
          >
            <Select placeholder="Selecione sua nacionalidade">
              <Option value="Brasileira" />
              <Option value="Estrangeira" />
            </Select>
          </Form.Item>

          <Form.Item
            name="pais_de_nascimento"
            label="Pais de Nascimento"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione seu pais de nascimento!',
              },
            ]}
          >
            <Select
              onChange={(value) => setValuePais(value)}
              // defaultValue="Brasil"
              placeholder="Selecione seu pais de nascimento">
              {paises_mundiais.sort().map((country) => (
                <Option value={country.name} key={country.name} />
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="estado_de_nascimento"
            label="Estado de Nascimento"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione seu estado de nascimento!',
              },
            ]}
          >
            {value_pais === 'Brasil' ? (
              <Select
                placeholder="Selecione seu estado de nascimento">
                {siglas_estados_brasileiros.map((state) => (
                  <Option value={state.sigla} key={state.sigla} />
                ))}
              </Select>
            ) : (
              <Input allowClear placeholder='Ex: NY' />
            )}
          </Form.Item>

          <Form.Item
            name="cidade_de_nascimento"
            label="Perfil"
          >
            <UploadProfile />
          </Form.Item>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Documentos de Identidade',
      children: (
        <>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[
              {
                required: true,
                message: 'Por favor, insira seu CPF!',
              },
            ]}
          >
            <InputMask mask="999.999.999-99" maskChar={null} disabled>
              {() => <Input type='text' disabled />}
            </InputMask>
          </Form.Item>

          <Form.Item
            name="orgao_emissor"
            label="Orgão Emissor"
          >
            <Select placeholder="Selecione o orgao emissor">
              {orgaos_emissores.map((orgao) => (
                <Option value={`${orgao.sigla} - ${orgao.extenso}`} key={orgao.sigla} />
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="estado_de_emissao_cpf"
            label="UF de Emissao"
          >
            <Select placeholder="Selecione o estado de emissao">
              {siglas_estados_brasileiros.map((state) => (
                <Option value={state.sigla} key={state.sigla} />
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="data_emissao_cpf"
            label="Data de Emissão"
            type='object'
            message='Please select time!'
            required={false}
          >
            <DatePicker />
          </Form.Item>
        </>
      ),
    },
    {
      key: '3',
      label: 'Titulo de Eleitor',
      children: (
        <>
          <Form.Item
            name="titulo_de_eleitor"
            label="Titulo de Eleitor"
          >
            <InputMask mask="9999 9999 9999" maskChar={null} >
              {() => <Input type='text' placeholder='0000 0000 0000' />}
            </InputMask>
          </Form.Item>
          <Form.Item
            name="zona_eleitoral"
            label="Zona Eleitoral"
          >
            <InputMask mask="999" maskChar={null} >
              {() => <Input type='text' placeholder='000' />}
            </InputMask>
          </Form.Item>
          <Form.Item
            name="secao_eleitoral"
            label="Seção Eleitoral"
          >
            <InputMask mask="9999" maskChar={null} >
              {() => <Input type='text' placeholder='0000' />}
            </InputMask>
          </Form.Item>
          <Form.Item
            name="estado_de_emissao_titulo"
            label="UF de Emissao"
          >
            <Select placeholder="Selecione o estado de emissao">
              {siglas_estados_brasileiros.map((state) => (
                <Option value={state.sigla} key={state.sigla} />
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="data_emissao_titulo"
            label="Data de Emissão"
            type='object'
            message='Please select time!'
            required={false}
          >
            <DatePicker />
          </Form.Item>
        </>
      ),
    },
  ];


  return (
    <div className='flex items-center justify-center'>
      <Form
        {...formItemLayout}
        name="register"
        scrollToFirstError
        className='formulario'
        initialValues={{ cpf: '049.484.423-05' }}
      >
        <Collapse
          defaultActiveKey={['1']}
          items={items}
          className='body-form'
        />
        <div className='view-button'>
          <Button
            htmlType='submit'
            size='large'
            icon={<MdDone />}
            loading={loadings[1]}
            onClick={() => {
              enterLoading(1)
              updateItemMenuStatus(0, 'finish')
              updateItemMenuStatus(1, 'process')
            }}
            style={{ backgroundColor: '#1E90FF', color: 'white' }}
            className='btn-confirm'
          >
            CONFIRMAR
          </Button>
        </div>
      </Form>
    </div>
  )
}

export { paises_mundiais, siglas_estados_brasileiros, formItemLayout }