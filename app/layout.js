import "./globals.css";

export const metadata = {
  title: "SSPR Design and Build: Office Interior Design | Office Renovation",
  alternates: {
    canonical: "https://www.sspr.com.sg/",
    languages: {
      "x-default": "https://www.sspr.com.sg/",
      "en": "https://www.sspr.com.sg/",
      "zh": "https://www.sspr.com.sg/zh",
      "th": "https://www.sspr.com.sg/th",
      "vi": "https://www.sspr.com.sg/vi",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      data-wf-domain="www.sspr.com.sg"
      data-wf-page="68f8983186a14adafbf05ece"
      data-wf-site="68f8983186a14adafbf05ee2"
      lang="en"
      suppressHydrationWarning={true}
    >
      <head>
        <link href="https://cdn.prod.website-files.com" rel="preconnect" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        
        {/* DOMContentLoaded and Load Event Interceptors to allow Webflow and other script tags to execute properly in Next.js */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const originalAddEventListener = document.addEventListener;
              document.addEventListener = function(type, listener, options) {
                if (type === 'DOMContentLoaded') {
                  if (document.readyState !== 'loading') {
                    setTimeout(() => {
                      try {
                        listener.call(document, new Event('DOMContentLoaded'));
                      } catch (e) {
                        console.error(e);
                      }
                    }, 1);
                    return;
                  }
                }
                return originalAddEventListener.call(document, type, listener, options);
              };
              
              const originalWindowAddEventListener = window.addEventListener;
              window.addEventListener = function(type, listener, options) {
                if (type === 'load') {
                  if (document.readyState === 'complete') {
                    setTimeout(() => {
                      try {
                        listener.call(window, new Event('load'));
                      } catch (e) {
                        console.error(e);
                      }
                    }, 1);
                    return;
                  }
                }
                return originalWindowAddEventListener.call(window, type, listener, options);
              };
            })();
          `
        }} />

        {/* w-mod-js and w-mod-touch initialization script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(o, c) {
                var n = c.documentElement,
                    t = " w-mod-";
                n.className += t + "js";
                ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch");
            }(window, document);
          `
        }} />

        <style dangerouslySetInnerHTML={{
          __html: `@media (min-width: 992px) {
                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a79d"] {
                    -webkit-transform:translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="da38125a-ae4d-006e-8143-9dd4937bd121"] {
                    -webkit-transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 250%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a7bc"] {
                    -webkit-transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="da38125a-ae4d-006e-8143-9dd4937bd140"] {
                    -webkit-transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a7b3"] {
                    -webkit-transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="da38125a-ae4d-006e-8143-9dd4937bd137"] {
                    -webkit-transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a7a8"] {
                    -webkit-transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="da38125a-ae4d-006e-8143-9dd4937bd12c"] {
                    -webkit-transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="8dc17493-a057-d132-c96c-9c121ed3d086"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="a0e51a66-3e33-34dd-7ab1-42d94cf2f83f"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="32afc3eb-90a0-2788-9613-3bbe618fe2eb"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="43122ea2-4116-cb3d-3aef-bb315fd995bb"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="fb846bce-bb4c-a48e-a980-f50036d8935c"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a7c7"] {
                    -webkit-transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="a0e51a66-3e33-34dd-7ab1-42d94cf2f840"] {
                    -webkit-transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 15vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="e840f924-5bf5-edaa-67af-d658ccabe520"] {
                    -webkit-transform: translate3d(0, 20vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 20vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 20vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 20vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="bcdf83d5-4bda-4bbc-eaa4-3e257f6f19e8"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f092"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="99a5c18a-7e69-8cb7-4871-5bbb224e8f8b"] {
                    -webkit-transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f097"] {
                    -webkit-transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 12vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="c1c0aa0d-ada8-83ee-6c5b-d42292f3b004"] {
                    -webkit-transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f09c"] {
                    -webkit-transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 14vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="424182d8-304c-3b7b-8a67-8fc1eeea38d0"] {
                    -webkit-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f0a6"] {
                    -webkit-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="03771e77-900f-0324-3c2c-405488200e71"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="b65aac54-68ea-1463-6b93-217c8c78efca"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="e858b623-237c-a2a2-de93-1343e427d842"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="170bed4a-e242-631a-7215-db387bdfaf08"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="b252354c-9ba8-1426-fa27-68d2a9155b41"] {
                    -webkit-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 10vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="5d3c740d-f932-7f1b-a6b1-aeb6bc6c956f"] {
                    -webkit-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="67563023-cd70-b4a6-ec8e-7f1e5fd7f0a1"] {
                    -webkit-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 16vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a789"] {
                    -webkit-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="e39d8c09-de9b-8aa6-4a29-8dbb08350ae0"] {
                    -webkit-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a78e"] {
                    -webkit-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="e39d8c09-de9b-8aa6-4a29-8dbb08350ae7"] {
                    -webkit-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="660a70d2-6b73-7416-9abd-24b96351a793"] {
                    -webkit-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="e39d8c09-de9b-8aa6-4a29-8dbb08350aee"] {
                    -webkit-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0, 22vw, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="487dec34-9760-df7b-b68d-2bb73b904e39"] {
                    -webkit-transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="d360f780-9a6d-e9e9-d285-a8d144dc7220"] {
                    -webkit-transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -moz-transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    -ms-transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    transform: translate3d(0px, 60vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="caaf14d2-61de-09a2-efe6-9fb5a36eee0c"] {
                    -webkit-transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -moz-transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -ms-transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="72390665-8ba1-39bb-139f-cc0ead5c5544"] {
                    -webkit-transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -moz-transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -ms-transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    transform: translate3d(-15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="5306eab6-ba48-c122-b592-1fa5038053e9"] {
                    -webkit-transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -moz-transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -ms-transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="ac89da25-5e5b-1246-3382-a703fe9b35ed"] {
                    -webkit-transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -moz-transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -ms-transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    transform: translate3d(15vw, 40vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="d13774df-788d-e92c-00ab-989bb79c0ac2"] {
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="821708b3-a122-9ccc-eaa6-4f8587af02ef"] {
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="0f2992bb-68aa-b69a-c1fd-a41651b37e8f"] {
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="d360f780-9a6d-e9e9-d285-a8d144dc7226"] {
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="b3f8fef3-e717-afb8-6c65-a644c56fcc7f"] {
                    width: 3vw;
                    height: 3vw;
                    -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -moz-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    -ms-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                    transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="776619ed-e44c-db72-7078-28810dae2d64"] {
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="a5cb5e24-ffc6-aebe-ba94-58f4f41022a7"] {
                    opacity: 0;
                }

                html.w-mod-js:not(.w-mod-ix) [data-w-id="f4bd3ece-56a2-a226-97c7-246481eb5cb2"] {
                    opacity: 0;
                }
            }

.w-dropdown-list.open-up {
                top: auto !important;
                bottom: 100% !important;
                transform-origin: bottom center !important;
            }

/* ======= PRELOADER ========= */
            g[transform="matrix(1.2295081615447998,0,0,1.2295081615447998,890.4400024414062,406.964599609375)"] {
                display: none !important;
            }

            .preloader-progress-wrapper {
                width: 100%;
                overflow: hidden;
            }

            .preloader-progress-bar {
                width: 0%;
                height: 100%;
                transition: width .2s linear;
            }

            /* ======= PRELOADER END ========= */
            .project-content-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .project-content-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .form-field {
                -webkit-appearance: none;
                appearance: none;
                border-radius: 0 !important;
                /* remove Safari’s rounded corners */
                box-shadow: none;
                -webkit-box-shadow: none;
                background-clip: padding-box;
            }

            .swiper.abt-slide .swiper-wrapper {
                align-items: center !important;
            }

            .swiper.building-3d {
                width: 100%;
                overflow: hidden;
                height: 100vh;
                position: absolute;
            }

            @media only screen and (max-width: 973px) {
                .swiper.building-3d {
                    height: 100vw;
                    perspective: 65vw !important;
                    transform-origin: center center !important;
                }
            }

            .swiper.building-3d {
                perspective: 50vw;
                transform-origin: center center !important;
            }

            .swiper.building-3d .swiper-wrapper {
                perspective: none !important;
                transform-style: preserve-3d !important;
                transform-origin: center center !important;
            }

            @media only screen and (max-width: 973px) {
                .swiper.building-3d .swiper-wrapper {
                    pointer-events: none !important;
                }
            }

            .swiper.building-3d .swiper-wrapper .swiper-slide {
                transform-style: preserve-3d !important;
                transform-origin: center bottom !important;
            }

            /*.swiper-slide.room-container.swiper-slide-prev {
	transform: rotateX(0deg) rotateY(0) rotateZ(0) !important;
}

.swiper-slide.room-container.swiper-slide-active {
	transform: rotateX(0deg) rotateY(0) rotateZ(0) !important;
}

.swiper-slide.room-container.swiper-slide-next {
	transform: rotateX(0deg) rotateY(0) rotateZ(0) !important;
}

.swiper-slide.room-container {
  transform: rotateX(0deg) rotateY(0) rotateZ(0) !important;
}*/
            .swiper.thumbnail-building-3d {
                width: 6vw;
                height: auto;
                overflow: hidden;
            }

            @media only screen and (max-width: 973px) {
                .swiper.thumbnail-building-3d {
                    width: 11vw;
                }
            }

            @media only screen and (max-width: 767px) {
                .swiper.thumbnail-building-3d {
                    width: 85vw;
                }
            }

            .swiper-slide.thumb-3d {
                height: auto !important;
            }

            .wrapper.thumb-3d {
                height: auto !important;
                gap: 0vw;
            }

            .swiper-slide.thumb-3d {
                opacity: 0.5 !important;
                border-color: transparent !important;
            }

            .swiper-slide.thumb-3d.swiper-slide-thumb-active {
                opacity: 1 !important;
                border-color: white !important;
            }

            .project-content-wrapper {
                transform: translate(0) scale(1.1) rotate(4deg);
            }

            .swiper.project-desc, .swiper.project-video {
                width: 100%;
            }

            /* Swiper Testi */
            .swiper.testi {
                width: 100%;
                position: relative;
                height: 27vw;
                /*overflow: hidden;*/
            }

            @media only screen and (max-width: 973px) {
                .swiper.testi {
                    height: auto;
                }
            }

            .swiper.testi .inner-left-testi img {
                width: 20vw;
                transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
                transform: rotate(-14deg) translate(-16vw, 0);
                opacity: 0;
            }

            @media only screen and (max-width: 973px) {
                .swiper.testi .inner-left-testi img {
                    width: 100%;
                }
            }

            .swiper.testi .right-content-testi .heading-testi, .swiper.testi .right-content-testi .cat-testi, .swiper.testi .right-content-testi .inner-right-content-text {
                transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
                transform: translateY(2rem);
                opacity: 0;
            }

            .swiper.testi .swiper-slide-active .inner-left-testi img {
                transform: rotate(0) translate(0, 0);
                transition-delay: 0.1s;
                opacity: 1;
            }

            .swiper.testi .swiper-slide-active .heading-testi {
                transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0s, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0s;
                transform: translateY(0);
                opacity: 1;
            }

            .swiper.testi .swiper-slide-active .cat-testi {
                transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.3s, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
                transform: translateY(0);
                opacity: 1;
            }

            .swiper.testi .swiper-slide-active .inner-right-content-text {
                transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.4s, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.4s;
                transform: translateY(0);
                opacity: 1;
            }

            /*.testi-prev:hover path,
.testi-next:hover path {
	fill: #f57f00;
}*/
            .testi-prev:hover rect, .testi-next:hover rect {
                fill: #f57f00;
                stroke: #f57f00;
            }

            @media (min-width: 768px) and (max-width: 1024px) {
                .swiper.testi .inner-left-testi img {
                    width: 90% !important;
                }
            }

            /* END Swiper Testi */
            .img-about-black {
                display: block;
                height: 100%;
                transition: height 0.5s ease-out;
                overflow: hidden;
            }

            .inner-section-3 {
                position: relative;
                z-index: 1;
            }

            /*.inner-section-3::before {
  content: "";
  position: absolute;
  top: 0;
  left: auto;
  right: auto;
  width: 100%;
  height: 100%;
  padding: 1px;
  background: linear-gradient(to bottom, #f57f00 0%, transparent 70%);
  border-radius: inherit;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}*/
            .img-wrap-black {
                position: relative;
                z-index: 1;
            }

            .img-wrap-black::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 1px;
                background: linear-gradient(111deg, #f57f00 0%, #080808 24%, #f57f00 100%);
                border-radius: inherit;
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                z-index: 5;
            }

            /* META SCROLL S2*/
            /* Default inactive state */
            .meta-about-s2-black {
                opacity: 1;
                transition: opacity 0.4s ease-in-out;
            }

            .meta-about-s2-black .background-tabs-abt {
                opacity: 0;
                transition: opacity 0.4s ease-in-out;
            }

            .meta-about-s2-black .meta-about-black {
                transition: color 0.4s ease-in-out, font-weight 0.4s ease-in-out;
            }

            /* Active state */
            .meta-about-s2-black.active {
                opacity: 1;
            }

            .meta-about-s2-black.active .background-tabs-abt {
                opacity: 1;
            }

            .meta-about-s2-black.active {
                color: #FF8400 !important;
            }

            .meta-about-s2-black:hover {
                color: #FF8400 !important;
            }

            .background-tabs-abt {
                top: 0;
                left: 0;
                height: 100%;
                width: 39%;
                transition: left 0.3s ease;
            }

            /* END META SCROLL S2*/
            .latest-project-image.second, .screen-3d-building.second {
                opacity: 0;
                transform: scale(1);
                transition: transform 10s ease, opacity 0.3s ease;
            }

            .latest-project-card:hover .latest-project-image.second, .screen:hover .screen-3d-building.second {
                opacity: 1;
                transform: scale(1.1);
            }

            .video-wrapper iframe {
                width: 100%;
                height: 100%;
                border: 0;
            }

            .swiper.abt-thumb .swiper-slide {
                width: auto !important;
            }

            .swiper.abt-thumb .swiper-wrapper {
                width: 100% !important;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            @media only screen and (max-width: 973px) {
                .swiper.abt-thumb .swiper-wrapper {
                    justify-content: flex-start;
                    gap: 4vw;
                }
            }

            @media screen and (min-width: 768px) and (max-width: 1024px) {
                .swiper.abt-thumb .swiper-slide {
                    width: auto !important;
                }

                .swiper.abt-thumb .swiper-wrapper {
                    align-items: center !important;
                    gap: 8vw;
                }
            }

            @media only screen and (max-width: 767px) {
                .swiper.abt-thumb .swiper-wrapper {
                    /*justify-content: space-between;
    gap: unset;*/gap: 1vw;
                    flex-wrap: wrap;
                }
            }

            .abt-thumb .swiper-slide .meta-about-s2-mob {
                color: #969696;
            }

            .abt-thumb .swiper-slide.swiper-slide-thumb-active .meta-about-s2-mob {
                color: #f57f00;
            }

            /* CSS (use instead of display:none approach) */
            .modal-single-project {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0,0,0,0.6);
                /* start hidden but present in layout so transitions work reliably */
                visibility: hidden;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.28s ease;
            }

            /* visible */
            .modal-single-project.is-active {
                visibility: visible;
                opacity: 1;
                pointer-events: auto;
            }

            /* during closing sequence (kept is-active at same time) */
            .modal-single-project.is-hiding {
                opacity: 0;
            }

            /* body lock when modal open */
            .modal-open {
                overflow: hidden;
            }

            /* CSS Mobile Circle */
            @media (max-width: 479px) {
                .inner-section-4 {
                    position: relative;
                    height: auto;
                    overflow: visible;
                }

                .mobile-three-cricle {
                    position: relative;
                    bottom: 0;
                    width: 100vw;
                }

                .mobile-three-cricle .swiper {
                    width: 100%;
                }

                .mobile-three-cricle::before, .mobile-three-cricle::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 7.5vw;
                    /* sisanya dari 100vw - 85vw */
                    pointer-events: none;
                    z-index: 5;
                }

                .mobile-three-cricle::before {
                    left: 0;
                    background: linear-gradient( to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100% );
                }

                .mobile-three-cricle::after {
                    right: 0;
                    background: linear-gradient( to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100% );
                }

                /*.strategy-circle.c1, .strategy-circle.c2, .strategy-circle.c3{
   width: 100vw;
   height: 100vw; 
  }*/
                .swiper.three-circle-mobs .swiper-wrapper .swiper-slide {
                    display: flex;
                    justify-content: center;
                }
            }

            /* END CSS Mobile Circle */
            #skip-button-compre, #skip-button-circle {
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            #skip-button-compre.show, #skip-button-circle.show {
                opacity: 1;
                pointer-events: auto;
            }

            .is-hidden {
                display: none !important;
            }

            .is-inline {
                display: inline-block !important;
            }

            svg.hover-hero-trigger path {
                outline: none;
            }

            svg.hover-hero-trigger path:hover {
                cursor: pointer;
            }

            .home-new-3d {
                opacity: 0;
                transition: opacity 0.3s linear;
            }

            .home-new-3d.active {
                opacity: 1;
            }

            @media (max-width: 991px) {
                [image-autoplay] {
                    opacity: 0;
                    transition: opacity 1.2s ease;
                    pointer-events: none;
                    will-change: opacity;
                }

                [image-autoplay].active {
                    opacity: 1;
                }
            }

`
        }} />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
