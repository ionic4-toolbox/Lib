# Publicação - PlayStore
![PLAYSTORE](/docs/img/playstore.png)

## Pré-requisítos

- A MBA Mobi recomenda 5 prints(o google exige entre 2 e 8 prints) do app tirados a partir de um device android (Enviar para o UX, junto com pequeno texto que descreve cada tela. O formato disponibilizado pelo UX deverá ser: 1080px × 1920px JPEG ou PNG de 24 bits (sem alfa)).
- Icone do App (512px x 512px PNG de 32 bits (com alfa), Disponibilizado pelo UX)
- Gráfico de recursos - Banner - (1024px x 500px a JPG ou PNG de 24 bits (sem alfa))
- Breve descrição do aplicativo (Texto com até 80 caracteres)
- Descrição completa (Até 4000 caracteres)
- Alguns detalhes do app: *Tipo de app, *Categoria, Site, *E-mail, link de Política de Privacidade. (Itens com * são obrigatórios)
- Não se esqueça de HOMOLOGAR os TEXTOS e IMAGENS junto ao clinte.
- Não se esqueça de HOMOLOGAR o icone do app e a splash screen!
- <b>PARAR ATUALIZAR VERSÃO,</b> o processo é igual a este, salvo bug ou melhoria(se for este o caso é necesário somente [enviar um novo APK](/docs/README_ANDROID_LOJA.md#aba-apk)).

## Realizando build realease

### Ionic 2

`$ npm run build:android --release --buildConfig=CAMINHO_PARA_BUILD_JSON/build.json --release #realiza build`

### Atenção
-<i> Não se esqueça de mudar o id e version no "config.xml", de acordo com os dados de produção.</i>
-<i> Para assinar APK manualmente:<br/>
`$jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore SEU_CERTIFICADO.keystore android-release-unsigned.apk ALIAS_DO_PROJETO`</i><br/>
-<i> Otimize o apk com o comando:<br/>
`$ $ANDROID_HOME/sdk/build-tools/VERSÃO/zipalign -v 4 android-release-unsigned.apk HelloWorld.apk`.</i>
-<i> Sempre utilize versões fechadas(tag/realease) nos plugins do cordova que constam no "config.xml"(usar a master pode te gerar serios problemas!).</i>

### Iniciando Publicação na loja

#### Aba "DETALHES DO APP"
- Abra o link da [PlayStore](https://play.google.com/apps/publish/signup/) e realize login
- Click em '+ Criar app'
![Tela 1](/docs/img/android/aba-detalhes-tela1.png)
- Defina o nome do app, e click em 'criar'
- Preencha a 'Breve descrição do aplicativo' e 'Descrição completa'
![Tela 2](/docs/img/android/aba-detalhes-tela2.png)
- Adicione o icones e as imagens
- Scrolle a tela em "RECURSOS GRÁFICOS", e faça a submissão um a um dos prints, clicando em "Adicionar captura de tela"
![Tela 3](/docs/img/android/aba-detalhes-tela3.png)
- Adicione o icone e Gráfico de recursos (banner)
![Tela 4](/docs/img/android/aba-detalhes-tela4.png)
- Preencha os demais dados com as informações citadas nos pré requisítos.
![Tela 5](/docs/img/android/aba-detalhes-tela5.png)

#### Aba "APK"
- Click em 'Enviar o primeiro APK para produção' e envie o apk
![Tela 1](/docs/img/android/aba-apk-tela1.png)
- Após enviado
![Tela 2](/docs/img/android/aba-apk-tela2.png)

* <b>Erros Comuns que impedem o envio:</b><br/>
    -<i> Senha do certificado incorreta (conferir no build.json)</i><br/>
    -<i> Alias incorreto (conferir no config.xml)</i><br/>
    -<i> Versão repetida (conferir no build.json)</i><br/>

#### Aba "CLASSIFICAÇÃO DO CONTEÚDO"
- Click em 'Continuar', nas telas subsequentes e selecione o tipo de aplicativo e responda o questionário de acordo com a especificação do APP (no geral nossos apps são para todas idades)
![Tela 1](/docs/img/android/aba-classificacao-tela1.png)
- Finalizando a classificação é calculada automaticamente:
![Tela 2](/docs/img/android/aba-classificacao-tela2.png)

#### Aba "PREÇO E DISTRIBUIÇÃO"
- Preencha os dados de preço e distribuição:
![Tela 1](/docs/img/android/aba-preco-tela1.png)
* <b>No geral é:</b><br/>
    -<i> Este app é: Gratuito</i><br/>
    -<i> Países : Todos</i><br/>
    -<i> CONTÉM ANÚNCIOS: Não, ele não tem anúncios</i><br/>
    -<i> Marcar o check ao fim da pagina: Diretrizes de conteúdo </i><br/>
    -<i> Marcar o check ao fim da pagina: Leis de exportação dos EUA </i><br/>
- Após preencher retorne ao topo da página  e click em "Salvar rascunho"
![Tela 2](/docs/img/android/aba-preco-tela2.png)

#### Enviar publicação
- Feito todos os passos o botão "Publicar app" fica disponível, click no botão e aquarde a revisão do APP!
![Tela publicar app](/docs/img/android/publicar-app.png)
* <b>Tempo para publicação:</b><br/>
    -<i> No android o app é avaliado em no máximo 1 dia (geralemnte em ate 3h)</i><br/>
    -<i> É raro ser recusado, mas pode ocorer, se for o caso é necessario ajustar o apk, realizar o mesmo processo e subir novamente</i><br/>