# Publicação - Loja Windows
![LOJA](/docs/img/loja.png)

## Pré-requisítos

- A MBA Mobi recomenda 5 prints(máximo de 8 prints) do app tirados a partir de um device windows (Enviar para o UX, junto com pequeno texto que descreve cada tela. O formato disponibilizado pelo UX deverá ser: 768 x 1280, 1280 x 768, 720 x 1280, 1280 x 720, 800 x 480 ou 480 x 800 pixels).
- Icone do App (300 x 300px PNG, Disponibilizado pelo UX)
- Arte promocional - Banner - (1000 x 800px PNG (sem alfa)
- Descrição (Até 10000 caracteres)
- Notas da versão(Texto com até 1500 caracteres)
- Alguns detalhes do app: Tipo de app, Categoria, Palavras-chave(para encontrar o app), Informações de copyright e marca registrada, Termos adicionais de licença(opcinonal), Site, Informações de contato do suporte(url ou email), URL da política de privacidade(opcional).
- Não se esqueça de <b>HOMOLOGAR</b> os <b>TEXTOS</b> e <b>IMAGENS</b> junto ao clinte.
- Não se esqueça de <b>HOMOLOGAR</b> o icone do app e a splash screen!
- <b>PARAR ATUALIZAR VERSÃO,</b> o processo é igual a este, salvo bug ou melhoria(se for este o caso é necesário somente [enviar um novo pacote(XAP)](/docs/README_WP_LOJA.md#pacotes)).

## Realizando build realease
### Sencha

`$ ERASE /S /Q cordova/www/* `<br/>
`$ ERASE /S /Q cordova/platforms/*`<br/>
`$ ERASE /S /Q cordova/plugins/*`<br/>
`$ ERASE /S /Q vendor/ `<br/>
`$ ERASE /S /Q cordova/config_timestamp.xml #limpa temporários`<br/>

`$ npm install && node_modules\.bin\bower install #instala vendor`<br/>

`$ sencha config -prop env=production then app build wp8 #realiza build`

### Ionic 2

`$ npm run build:windows --release #realiza build`

### Atenção
* <b>OBS:</b><br/>
    -<i> Não se esqueça de mudar o id e version no "config.xml", de acordo com os dados de produção.</i><br/>
    -<i> Sempre utilize versões fechadas(tag/realease) nos plugins do cordova que constam no "config.xml"(usar a master pode te gerar serios problemas!).</i>


### Iniciando Publicação na loja
- Abra o link da [developer microsoft](https://developer.microsoft.com/pt-br/dashboard/apps/overview) e realize login
- Click em "Criar outro app"
![Tela 1](/docs/img/wp/wp-tela1.png)
- Informe o nome do APP e click em "Reservar nome do produto"
![Tela 2](/docs/img/wp/wp-tela2.png)
- Click em "Iniciar seu envio"
![Tela 3](/docs/img/wp/wp-tela3.png)
- Devemos preencher toda lista abaixo (exerto itens, Opcionais)
![Tela 4](/docs/img/wp/wp-tela4.png)


#### Preço e diponibilidade
- Preencha o formulário
![Tela 5](/docs/img/wp/wp-tela5.png)
* <b>No geral é:</b><br/>
    -<i> Preço base: Gratuito</i><br/>
    -<i> Avaliação gratuita: Gratuito</i><br/>
    -<i> Data da publicação: ecolha a opção desejada. Automatica, maunal ou programada</i><br/>
![Tela 6](/docs/img/wp/wp-tela6.png)
- Click em "Salvar"

#### Popriedades
- Preencha o formulário
![Tela 7](/docs/img/wp/wp-tela7.png)
* Categoria e subcategoria
    - Preencha de acordo com o tipo do App</i><br/>
* Declarações do produto
    - Deixe como está, mas leia do que se trata ;)
* Requisitos do sistema
    - Marque os seguintes check's em Hardware mínimo: Tela touch, Câmera(se for o caso).
    - Click em "Salvar"

#### Classificações etárias
![Tela 8](/docs/img/wp/wp-tela8.png)
- Desça ate Questionário de classificação, marque o tipo de aplicativo
* <b>Responsa o formulario abaixo, no geral é:</b><br/>
    -<i> Violência: Não</i><br/>
    -<i> Sexualidade: Não</i><br/>
    -<i> Linguagem: Não</i><br/>
    -<i> Substâncias controladas: Não</i><br/>
    -<i> O aplicativo permite nativamente... : Não </i><br/>
    -<i> O aplicativo compartilha a... : Não</i><br/>
    -<i> A aplicação permite aos... : Não</i><br/>
    -<i> GRB : Nenhuma classificação selecionada</i><br/>
- Click em "Salvar e gerar"
- Será gerada e exibida a classificação, role a tela para o rodapé e click em "Continuar"


#### Listagens da Loja - Gerenciar idiomas de listagem da Loja
- Em "Idiomas de listagem da Loja adicionais" pesquise Português e selecione "Português (Brasil)" e click em "Atualizar"
- Click em salvar
- Ao retornar para a lista do "Envio" click no link "Português (Brasil)" na parte de "Listagens da Loja"

##### Listagem da loja - Português (Brasil)
![Tela 11](/docs/img/wp/wp-tela11.png)
- Preencha: Nome do aplicativo, Descrição, Notas de versão(Opinicional).
- Capturas de tela de celular, com as imagens fornecidas pelo UX.
![Tela listagem1](/docs/img/wp/wp-listagem-1.png)
- Ícone do bloco de aplicativo e Arte promocional
![Tela listagem2](/docs/img/wp/wp-listagem-2.png)
- Palavras-chave, Informações de copyright e marca registrada, Site, Informações de contato do suporte
![Tela listagem3](/docs/img/wp/wp-listagem-3.png)
- Após preenchidos os dados click em salvar.

#### Pacotes
- Gerando XAP [Veja](/docs/README_GERANDO_XAP.md)
- Arraste o XAP para a area especificada, "Arraste seus pacotes para cá (.xap, .appx, .appxbundle, .appxupload)  ou procure seus arquivos."
![Tela Pacotes1](/docs/img/wp/wp-pacotes1.png)

#### Enviar publicação
- Feito todos os passos o botão "Enviar para a Loja" no rodapé da lista de envio fica disponível, click no botão e aquarde a revisão do APP!
* <b>Tempo para publicação:</b><br/>
    -<i> No android o app é avaliado em no máximo 16h (geralemnte em ate 6h)</i><br/>
    -<i> É raro ser recusado, mas pode ocorer, se for o caso é necessario ajustar o xap, realizar o [envio de um novo pacote(XAP)](/docs/README_WP_LOJA.md#pacotes)</i><br/>