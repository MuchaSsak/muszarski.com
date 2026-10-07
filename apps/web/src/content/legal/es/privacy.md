---
title: "Política de privacidad"
description: "Cómo trata Mateusz Muszarski los datos personales en este sitio: formulario de contacto, registros del servidor, estadísticas sin cookies y derechos del usuario."
version: "1.0"
updated: 2026-10-05
---

## 1. Disposiciones generales

1. La presente política de privacidad (en adelante, la «Política») establece las normas de tratamiento de datos personales relacionadas con el uso del sitio web disponible en [[SITE_URL]], en todas sus versiones lingüísticas (en adelante, el «Sitio»). La Política da cumplimiento a las obligaciones de información previstas en el artículo 13 del RGPD y en el artículo 399, apartado 1, punto 1, de la PKE.
2. A efectos de la Política:
   1) **RGPD**: Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos y por el que se deroga la Directiva 95/46/CE (Reglamento general de protección de datos) (DO L 119 de 4.5.2016, p. 1);
   2) **PKE**: Ley polaca de 12 de julio de 2024 de Comunicaciones Electrónicas (Prawo komunikacji elektronicznej; Dz.U. 2024, posición 1221, en su versión modificada);
   3) **Usuario**: la persona física que utiliza el Sitio.
3. El Sitio no está dirigido a menores.
4. El Responsable aplica las medidas a que se refiere el artículo 32 del RGPD, incluido el cifrado de los datos transmitidos entre el navegador del Usuario y el Sitio (HTTPS).

## 2. Responsable del tratamiento

1. El responsable del tratamiento de los datos personales es Mateusz Muszarski, persona física (Polonia), dirección postal: [[POSTAL_ADDRESS]], correo electrónico: [[EMAIL]] (en adelante, el «Responsable»).
2. El Responsable no ha designado un delegado de protección de datos, al no estar obligado a ello conforme al artículo 37, apartado 1, del RGPD. Para cualquier cuestión relativa a los datos personales puede dirigirse al Responsable en las direcciones indicadas en el punto 1.

## 3. Finalidades, bases jurídicas y plazos de conservación

| Finalidad | Base jurídica e interés legítimo | Plazo de conservación |
| --- | --- | --- |
| Prestación del Sitio y garantía de su seguridad (sección 4) | artículo 6.1.f) del RGPD: seguridad de la red y de la información y correcto funcionamiento del Sitio (considerando 49 del RGPD) | el plazo fijado por Vercel para el plan del Responsable; en la fecha de la Política, registros de ejecución de las funciones de servidor: 1 día |
| Respuesta a un mensaje del formulario de contacto (sección 5) | artículo 6.1.f) del RGPD: responder a las consultas; artículo 6.1.b) del RGPD cuando el mensaje se refiera a un empleo o a un proyecto (medidas precontractuales a petición del Usuario) | el tiempo necesario para tramitar el asunto y, después, no más de 12 meses desde el último mensaje; en el servicio EmailJS: hasta 30 días |
| Protección del formulario frente al correo no deseado y los abusos (secciones 5 y 6) | artículo 6.1.f) del RGPD: proteger el formulario frente a abusos automatizados | dirección IP: el tiempo necesario para aplicar el límite de mensajes; datos de Turnstile: según las normas de Cloudflare |
| Estadísticas de visitas (sección 7) | artículo 6.1.f) del RGPD: conocer cómo se utiliza el Sitio; artículo 399 de la PKE, en la medida en que sea aplicable | 6 meses |
| Formulación, ejercicio o defensa de reclamaciones | artículo 6.1.f) del RGPD: proteger los derechos del Responsable | hasta la prescripción de las acciones |

## 4. Alojamiento y registros del servidor

1. El Sitio está alojado en la infraestructura de Vercel Inc. (Estados Unidos). Las páginas se sirven a través de la red global de distribución de contenidos (CDN) de Vercel, por regla general desde la ubicación más próxima al Usuario. La función de servidor que gestiona el formulario de contacto se ejecuta en una región de la Unión Europea (Fráncfort del Meno, Alemania).
2. Al mostrarse una página, se registran en los registros del servidor: la dirección IP, la fecha y hora de la solicitud, la ruta del recurso solicitado, la página de procedencia (referrer) y el identificador del navegador (user agent).
3. Respecto de los datos generados por el servicio (datos de uso y metadatos), Vercel Inc. es responsable independiente y los trata conforme a la [política de privacidad de Vercel](https://vercel.com/legal/privacy-policy).

## 5. Formulario de contacto

1. El formulario de contacto contiene los campos siguientes: el mensaje (obligatorio); los datos para la respuesta, es decir, una dirección de correo electrónico, un número de teléfono o la URL de un perfil de LinkedIn, a elección del Usuario (obligatorio); el asunto: un empleo, un proyecto o una pregunta (opcional).
2. Al enviarse un mensaje, la función de servidor trata además la dirección IP del remitente para limitar el número de mensajes enviados desde una misma dirección (rate limiting).
3. El mensaje se entrega por correo electrónico a través del servicio EmailJS, prestado por EmailJS Pte. Ltd. (Singapur), cuyos servidores se encuentran en los Estados Unidos, en el buzón del Responsable gestionado por [[MAILBOX_PROVIDER]].
4. El Responsable responde por el canal indicado por el Usuario. Si se indica un perfil de LinkedIn, la correspondencia tiene lugar en ese servicio, cuyo operador es un responsable independiente.
5. Los mensajes no deben contener categorías especiales de datos personales (artículo 9, apartado 1, del RGPD) ni datos innecesarios de terceros.
6. También es posible dirigirse al Responsable directamente en [[EMAIL]].

## 6. Protección del formulario (Cloudflare Turnstile)

1. El formulario de contacto está protegido por el servicio Cloudflare Turnstile, prestado por Cloudflare, Inc. (Estados Unidos). Turnstile solo se carga cuando el Usuario empieza a utilizar el formulario.
2. Cloudflare trata la dirección IP, la huella TLS (TLS fingerprint), la cabecera User-Agent, la clave del sitio (sitekey) junto con el dominio y otras señales relativas al navegador y al dispositivo, y puede almacenar en el navegador la información necesaria para la verificación (sección 8).
3. Cloudflare actúa como encargado del tratamiento en lo relativo a la protección del Sitio y como responsable independiente en lo relativo a la mejora de su detección de bots, conforme al [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/) y a la [política de privacidad de Cloudflare](https://www.cloudflare.com/privacypolicy/).
4. Si la verificación no se supera, el Usuario puede dirigirse al Responsable por correo electrónico.

## 7. Estadísticas de visitas (Umami)

1. El Sitio utiliza el servicio Umami Cloud, prestado por Umami Software, Inc. (Estados Unidos), con almacenamiento de los datos en la región de la Unión Europea. El servicio no utiliza cookies.
2. Se tratan: la ruta de la página visitada, la página de procedencia, el tamaño de la pantalla, el idioma del navegador, el tipo de navegador, el sistema operativo, el tipo de dispositivo, el país (determinado a partir de la dirección IP en el momento de la visita; la dirección IP no se almacena), un identificador del visitante en forma de hash que cambia cada mes y eventos, por ejemplo la descarga del CV, el envío del formulario de contacto o el cambio de versión lingüística. Los eventos no incluyen lo escrito en el formulario.
3. El Responsable no combina el identificador del visitante con otros datos, no lo utiliza para identificar a nadie y no elabora perfiles de los Usuarios.
4. El script de estadísticas lee del navegador, en particular, el tamaño de la pantalla, el idioma, la configuración Do Not Track y la entrada `umami.disabled`. La presente sección constituye la información a que se refiere el artículo 399, apartado 1, punto 1, de la PKE; el acceso se realiza teniendo en cuenta el artículo 399 de la PKE, en la medida en que dicho precepto sea aplicable. El Sitio no muestra ningún aviso (banner) de consentimiento para las estadísticas.
5. El Usuario puede determinar las condiciones de este acceso (artículo 399, apartado 1, punto 1, letra b, de la PKE):
   1) activando en el navegador la señal Do Not Track o Global Privacy Control; en tal caso, el script de estadísticas no se carga;
   2) utilizando el interruptor de esta página, que guarda la entrada `umami.disabled`; en tal caso, el script no envía datos;
   3) bloqueando los scripts en la configuración del navegador o mediante extensiones.

## 8. Cookies y almacenamiento del navegador

1. El Sitio no utiliza cookies. Solo se almacena información en el navegador del Usuario en los casos siguientes:

| Clave | Cuándo se guarda | Finalidad | Plazo de conservación |
| --- | --- | --- | --- |
| `theme` | al elegir el tema de color Papel o Tinta | recordar el tema | hasta restablecer el tema predeterminado o borrar los datos del sitio |
| `motion` | al detener las animaciones | recordar esa elección | hasta reanudar las animaciones o borrar los datos del sitio |
| `umami.disabled` | al desactivar las estadísticas | recordar la exclusión | hasta reactivar las estadísticas o borrar los datos del sitio |
| datos de Cloudflare Turnstile | al utilizar el formulario de contacto | verificación antispam | según las normas de Cloudflare |

2. Las entradas `theme`, `motion` y `umami.disabled` se guardan en el almacenamiento local del navegador (localStorage), solo las leen los scripts del Sitio en el navegador del Usuario y no se envían al servidor.
3. El Responsable considera que las operaciones descritas en el punto 1 son necesarias para prestar una función solicitada por el Usuario, en el sentido del artículo 399, apartado 3, punto 2, de la PKE.
4. El Usuario puede borrar esta información en cualquier momento en la configuración del navegador; en tal caso, el Sitio aplica la configuración predeterminada.

## 9. Enlaces a servicios externos

1. El Sitio no inserta contenidos de terceros. Las fuentes tipográficas y los vídeos se sirven desde la propia infraestructura del Sitio.
2. Los enlaces a GitHub, LinkedIn, npm, Instagram, Facebook, Telegram, App Store, Google Play, Discord y Messenger son simples hipervínculos; no se transmite ningún dato a los operadores de esos servicios hasta que se hace clic. Tras el clic, el operador del servicio trata los datos como responsable independiente, conforme a su propia política de privacidad.

## 10. Datos del Responsable publicados en el Sitio

1. En la página «Mi vida», el Responsable publica por decisión propia información sobre sí mismo, incluidos sus intereses y sus creencias religiosas, como datos que el interesado ha hecho manifiestamente públicos (artículo 9, apartado 2, letra e, del RGPD). Dicha página no contiene datos personales de terceros.
2. Toda entidad que trate posteriormente esta información debe disponer de su propia base jurídica para el tratamiento.

## 11. Destinatarios de los datos

1. Los destinatarios de los datos personales son:

| Destinatario y alcance | Función | Lugar de almacenamiento |
| --- | --- | --- |
| Vercel Inc. (Estados Unidos): alojamiento, registros del servidor, gestión del formulario | encargado del tratamiento; responsable independiente de los datos generados por el servicio | CDN global; función del formulario: UE (Fráncfort) |
| EmailJS Pte. Ltd. (Singapur), operador del servicio EmailJS: entrega de mensajes | encargado del tratamiento | Estados Unidos |
| [[MAILBOX_PROVIDER]]: buzón del Responsable | encargado del tratamiento | [[MAILBOX_LOCATION]] |
| Cloudflare, Inc. (Estados Unidos): verificación Turnstile | encargado del tratamiento; responsable independiente para la mejora de la detección de bots | red global de Cloudflare |
| Umami Software, Inc. (Estados Unidos): estadísticas de visitas | encargado del tratamiento | Unión Europea |

2. Los encargados tratan los datos únicamente siguiendo instrucciones del Responsable, sobre la base de contratos celebrados conforme al artículo 28 del RGPD.
3. Los datos pueden comunicarse a autoridades públicas cuando así lo exija una obligación legal (artículo 6.1.c) del RGPD).

## 12. Transferencias fuera del Espacio Económico Europeo

1. Los datos pueden transferirse a los Estados Unidos sobre la base, según proceda, de:
   1) la Decisión de Ejecución (UE) 2023/1795 de la Comisión, de 10 de julio de 2023, relativa al EU-US Data Privacy Framework (artículo 45 del RGPD), respecto de Vercel Inc. y, en la medida en que su certificación sea aplicable, de Cloudflare, Inc.;
   2) las cláusulas contractuales tipo adoptadas mediante la Decisión de Ejecución (UE) 2021/914 de la Comisión, de 4 de junio de 2021 (artículo 46.2.c) del RGPD), respecto de EmailJS Pte. Ltd. (Singapur y Estados Unidos) y de Umami Software, Inc. en caso de acceso a los datos desde los Estados Unidos y, como garantía adicional, respecto de Cloudflare, Inc.
2. Si [[MAILBOX_PROVIDER]] u otro destinatario trata datos fuera del Espacio Económico Europeo, la transferencia se realiza únicamente sobre la base del artículo 45 o del artículo 46 del RGPD.
3. Puede obtenerse del Responsable una copia de las garantías aplicadas. La lista de entidades certificadas está disponible en [dataprivacyframework.gov](https://www.dataprivacyframework.gov/list).

## 13. Derechos del interesado

1. El Usuario tiene derecho de acceso a los datos (artículo 15 del RGPD), de rectificación (artículo 16 del RGPD), de supresión (artículo 17 del RGPD), de limitación del tratamiento (artículo 18 del RGPD), de portabilidad de los datos tratados por medios automatizados sobre la base del artículo 6.1.b) del RGPD (artículo 20 del RGPD) y de oposición (artículo 21 del RGPD; sección 14).
2. El Responsable no trata los datos de los Usuarios sobre la base del consentimiento (artículo 6.1.a) del RGPD).
3. El Responsable responde a la solicitud sin dilación indebida y, en cualquier caso, en el plazo de un mes a partir de su recepción; dicho plazo puede prorrogarse otros dos meses, lo que el Responsable comunica al Usuario (artículo 12, apartado 3, del RGPD). Las actuaciones son gratuitas, sin perjuicio del artículo 12, apartado 5, del RGPD. En caso de dudas razonables, el Responsable puede solicitar información que confirme la identidad del solicitante (artículo 12, apartado 6, del RGPD).
4. Si el Responsable no está en condiciones de identificar al Usuario, en particular en los datos estadísticos, no se aplican los artículos 15 a 20 del RGPD, salvo que el Usuario facilite información adicional que permita su identificación (artículo 11, apartado 2, del RGPD).

## 14. Derecho de oposición

1. El Usuario tiene derecho a oponerse en cualquier momento, por motivos relacionados con su situación particular, al tratamiento de los datos personales que le conciernan basado en el artículo 6.1.f) del RGPD (artículo 21, apartado 1, del RGPD). En tal caso, el Responsable deja de tratar los datos, salvo que acredite motivos legítimos imperiosos que prevalezcan sobre los intereses, los derechos y las libertades del Usuario, o motivos para la formulación, el ejercicio o la defensa de reclamaciones.
2. El Usuario puede oponerse a las estadísticas de visitas en cualquier momento del modo descrito en la sección 7, punto 5.

## 15. Reclamación ante una autoridad de control

1. El Usuario tiene derecho a presentar una reclamación ante una autoridad de control (artículo 77 del RGPD): el Presidente de la Oficina de Protección de Datos Personales (Prezes Urzędu Ochrony Danych Osobowych), ul. Stanisława Moniuszki 1A, 00-014 Varsovia, Polonia ([uodo.gov.pl](https://uodo.gov.pl)), o la autoridad de control del Estado miembro en el que tenga su residencia habitual o su lugar de trabajo, o en el que se haya producido la supuesta infracción.

## 16. Carácter voluntario de los datos y decisiones automatizadas

1. La facilitación de datos en el formulario de contacto es voluntaria y no constituye un requisito legal ni contractual; sin el mensaje y los datos para la respuesta no es posible enviar el mensaje ni responder. Los datos de los registros del servidor los transmite automáticamente el navegador.
2. El Responsable no adopta decisiones basadas únicamente en el tratamiento automatizado, incluida la elaboración de perfiles, en el sentido del artículo 22 del RGPD. La verificación de Turnstile solo determina si el formulario puede enviarse.

## 17. Modificaciones de la Política y versiones lingüísticas

1. Versión vigente de la Política: 1.0, de 5 de octubre de 2026. Cada modificación de la Política se identifica con un nuevo número de versión y una nueva fecha, indicados al inicio del documento.
2. La Política se ha redactado en polaco. Las versiones inglesa y española son traducciones; en caso de discrepancia, prevalece la versión polaca. La versión española se ha elaborado con ayuda de traducción automática y está pendiente de revisión.
