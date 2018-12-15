/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/dace.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('tutorial/getting-started')}>开始</Button>
            <Button href="https://github.com/dacejs/dace">github</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align={props.align}
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: `无论使用 React 还是其他库，Dace 都致力让你关注代码，而不是构建工具。

要创建名为 \`my-app\` 的项目，请运行以下命令：

\`\`\`sh
npx create-dace-app my-app
\`\`\`
`,
            image: `${baseUrl}img/create-dace-app-480.gif`,
            imageAlign: 'right',
            title: '快速入门',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn" align="center">
        {[
          {
            content: '你不需要学习和配置许多构建工具。即时重新加载可以帮助你集中精力进行开发。当需要部署时，包会自动优化。',
            // image: `${baseUrl}img/dace.svg`,
            // imageAlign: 'top',
            title: '容易上手',
          },
          {
            content: '你只需要写一套代码，99% 的代码均是服务器端和浏览器端共用，能极大的提升开发效率和降低维护成本。',
            // image: `${baseUrl}img/dace.svg`,
            // imageAlign: 'top',
            title: '深度同构',
          },
          {
            content: 'Dace 使用 Webpack、Babel、ESLint、PostCSS 和其他优秀的项目来为应用程序提供动力。如果你想要高级配置，你可以直接编辑它们的配置文件。',
            // image: `${baseUrl}img/dace.svg`,
            // imageAlign: 'top',
            title: '开箱即用',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>谁在使用 Dace ？</h2>
          <p>其他人也在使用 Dace</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              更多 {siteConfig.title} 使用者
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow align="left" />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
