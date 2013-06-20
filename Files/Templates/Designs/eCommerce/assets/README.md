# Assets

## General

En Solutionset løsning er bygget på Twitter Bootstrap v. 2.1.0 ([http://twitter.github.io/bootstrap/](http://twitter.github.io/bootstrap/)).

Screen.css filen skal inkluderes efter Twitter Bootstrap filerne for at du nemmest kan style dit website.

F.eks.

```html
<link href="assets/css/bootstrap.css" rel="stylesheet"/>
<link href="assets/css/bootstrap-responsive.css" rel="stylesheet"/>
<link href="assets/css/screen.css" rel="stylesheet"/>
```

## Non-responsive

Hvis du ikke vil have et responsive site kan du fjerne linien:

```html
<link href="assets/css/bootstrap-responsive.css" rel="stylesheet"/>
```


## Filer

favicon.ico

### Webapp specifikke ikoner

- apple-touch-icon.png

- apple-touch-icon-precomposed.png

- apple-touch-icon-57x57-precomposed.png

- apple-touch-icon-72x72-precomposed.png

- apple-touch-icon-114x114-precomposed.png

- apple-touch-icon-144x144-precomposed.png


## Subfolders

### [fonts/](fonts/)

Used for font files. Can be one or more typographies or an icon font.

Webfont generator:

[http://www.fontsquirrel.com/tools/webfont-generator](http://www.fontsquirrel.com/tools/webfont-generator)

Til ikon fonte anbefaler vi:

Font Awesome:
[http://fortawesome.github.io/Font-Awesome/](http://fortawesome.github.io/Font-Awesome/)

eller hvis du vil lave din egen ikon-font via .svg filer:
[http://icomoon.io/app/](http://icomoon.io/app/)

Alternativt til at have fonte liggende i denne mappe kan f.eks. bruges:

Google fonts: http://www.google.com/fonts/

Typekit: https://typekit.com/fonts


### [images/](images/)

Used for images that are part of the website design, i.e. not images that are part of the site content.

Kunne f.eks. være en CSS sprite.

http://css-tricks.com/css-sprites/

- eller fallback grafikstumper til ældre browsere.


### [javascripts/](javascripts/)

Er til dine egne javascripts.

Vi har lagt main.js og plugins.js ind her.


main.js er til dit eget custom javascript. Vi har indsat nogle hjælpere
så du nemmere kan komme i gang med dit jQuery.

plugins.js indeholder en hjælper til udviklingen, så du kan bruge
"console" i din debugging af javascript uden at tænke på fejl
forskellige browsere.

Filen henter også nogle javascript plugins, som bruges på løsningen via
"require-jquery.js" (http://requirejs.org/docs/jquery.html). 


### [sass/](sass/)

We're using [Compass](http://compass-style.org/](http://compass-style.org/), a CSS Authoring Framework, for maintaining the CSS in the Solution Set.

All scss files in the sass folder are compiled into a css file that is included in the page template.

Denne mappe består af følgende overordnede filer:

**checkout.scss**

CSS til checkout processen i en eCommerce løsning.

****\

**ie.scss**

Placer IE specifik CSS heri.

****\

**print.scss**

Placer print specifik CSS heri.


**screen.scss**

Her importeres alle nedenstående partials og efter der compiles kommer
en screen.css ud som indsættes på sitet.

Udkommenter/slet evt import af partials fra denne fil, hvis de ikke skal
med i den endelige screen.css fil.

\

Derudover er mappen "partials" som indeholder følgende SCSS filer:

**\_\_vars.scss**

Opsæt de globale variabler her som du derefter kan genbruge igennem de
andre partials.

\

**\_404.scss**

**\_basic.scss**

Indeholder den overordnede opsætning af en SolutionSet løsning.

\

**\_buttons.scss**

**\_cart.scss**

**\_customer-center.scss**

**\_footer.scss**

**\_frontpage.scss**

**\_header.scss**

Logoet er indsat som SVG for at kunne ramme retina skærme som fx er på
iPad 3 og iPhone 5.

Via Modernizer laves et fallback til en PNG version af logoet, så
browsere som ikke understøtter SVG vil få vist PNG versionen i stedet.

\

Her vises hvordan du laver en SVG version af dit logo:
[http://css-tricks.com/using-svg/](http://css-tricks.com/using-svg/)

Modernizer dokumentation:
[http://modernizr.com/docs/](http://modernizr.com/docs/)

****\

**\_instant-search.scss**

**\_modals.scss**

**\_navigation.scss**

**\_product-catalog.scss**

**\_searchbar.scss**

**\_sprites.scss**

****\

**stylesheets**

**checkout.css**

Bruges til checkout processen i en eCommerce løsning.

\

**ie.css**

Kald stylesheetet i din \<head\> vha:

\<!--[if IE]\>

\<link href="assets/css/ie.css" media="screen" rel="stylesheet" /\>

\<![endif]--\>

\

**print.css**

Kald stylesheetet i din \<head\> vha:

\<link href="assets/css/print.css" media="print" rel="stylesheet" /\>

****\

**custom.screen.css**

Bruges til at overskrive screen.css filen med dine egne styles.

Kald stylesheetet i din \<head\> efter screen.css sådan her:

\<link href="assets/css/screen.css" media="screen" rel="stylesheet" /\>

\<link href="assets/css/custom.screen.css" media="screen"
rel="stylesheet" /\>

****\

**vendor**

Indeholder bl.a. javascript udviklet af Dynamicweb selv, jQuery samt
andre udviklere.

Placer yderligere plugins som du ikke selv har skrevet heri.
