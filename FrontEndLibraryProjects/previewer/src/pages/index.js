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

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      
    </div>
  </Layout>
)

export default IndexPage
