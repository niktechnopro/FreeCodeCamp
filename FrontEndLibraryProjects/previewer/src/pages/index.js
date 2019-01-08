import React from 'react';
// import { Link } from 'gatsby';

import Layout from '../components/layout';
// import Image from '../components/image'
import SEO from '../components/seo';
import MainBody from '../components/MainBody';

const IndexPage = () => (
  <Layout>
    <SEO title="Markdown Previewer Project" keywords={[`gatsby`, `application`, `react`]} />
    
    <MainBody />
    
  </Layout>
)

export default IndexPage
