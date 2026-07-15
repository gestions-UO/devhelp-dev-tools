const fs = require('fs');

let launcher = fs.readFileSync('src/app/launcher/page.tsx', 'utf8');
launcher = launcher.replace(/icon: Bs([a-zA-Z0-9]+)/g, 'icon: $1');
launcher = launcher.replace(/FiletypeJson/g, 'CodeFile');
launcher = launcher.replace(/FiletypeXml/g, 'CodeFile');
launcher = launcher.replace(/FileEarmarkBinary/g, 'FileContent');
launcher = launcher.replace(/ArrowLeftRight/g, 'ArrowSwapHorizontal2');
launcher = launcher.replace(/Markdown/g, 'DocumentText');
launcher = launcher.replace(/HddNetwork/g, 'HardDrive');
launcher = launcher.replace(/Link45Deg/g, 'Link');
launcher = launcher.replace(/GeoAlt/g, 'MapPoint');
launcher = launcher.replace(/ShieldLock/g, 'ShieldCheck');
launcher = launcher.replace(/ListUl/g, 'List');
launcher = launcher.replace(/ArrowsCollapse/g, 'ArrowDown');
launcher = launcher.replace(/WindowSplit/g, 'Window');
launcher = launcher.replace(/Magic/g, 'MagicWand');
launcher = launcher.replace(/PaletteFill/g, 'Palette');
launcher = launcher.replace(/ClockHistory/g, 'Clock');
launcher = launcher.replace(/ArrowsIn/g, 'ArrowDown');
launcher = launcher.replace(/Regex/g, 'Text');
launcher = launcher.replace(/ArrowsRight/g, 'ArrowRight');
launcher = launcher.replace(/import \{.*\} from "reicon-react";/, 'import { CodeFile, ShieldCheck, Text, Clock, ArrowDown, Window, Terminal, Globe, MapPoint, HardDrive, ArrowSwapHorizontal2, Link, MagicWand, Palette, DocumentText, List, FileContent } from "reicon-react";');
launcher = launcher.replace(/const itemVariants: Variants =/g, 'const itemVariants: any =');
fs.writeFileSync('src/app/launcher/page.tsx', launcher);

let htmlPage = fs.readFileSync('src/app/tool/html/page.tsx', 'utf8');
htmlPage = htmlPage.replace(/PlusLg/g, 'Plus');
htmlPage = htmlPage.replace(/BoxArrowUpRight/g, 'ArrowUpRight2');
htmlPage = htmlPage.replace(/FiletypeCss/g, 'CodeFile');
fs.writeFileSync('src/app/tool/html/page.tsx', htmlPage);

let docsPage = fs.readFileSync('src/app/docs/page.tsx', 'utf8');
docsPage = docsPage.replace(/CloudSlash/g, 'CloudMinus');
fs.writeFileSync('src/app/docs/page.tsx', docsPage);

let legalPage = fs.readFileSync('src/app/legal/page.tsx', 'utf8');
legalPage = legalPage.replace(/XLg/g, 'X');
fs.writeFileSync('src/app/legal/page.tsx', legalPage);

let apiPage = fs.readFileSync('src/app/tool/api/page.tsx', 'utf8');
apiPage = apiPage.replace(/if \(method === "HEAD"\)/g, 'if ((method as string) === "HEAD")');
fs.writeFileSync('src/app/tool/api/page.tsx', apiPage);
console.log("Fixed files!");
