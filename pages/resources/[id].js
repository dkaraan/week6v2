import { getResourceIds, getResourceData } from "../../lib/resources";
import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';

//every next.js app that uses dynamic urls must include getStaticPaths() to tell next.js what and where all the possible urls are
export async function getStaticPaths(){
  const paths = await getResourceIds();
  console.log(paths)
  return {
    paths,
    fallback:false
  };
}

//getResourceData will get from getStaticProps()
export async function getStaticProps({params}) {
  const itemData = await getResourceData(params.id);

  console.log("itemData:")
  console.log(itemData);
  return{
    props:{
      itemData
    }
  };
}

//receiving item data that it receives from getStaticProps()
export default function Entry({ itemData }){
  console.log(itemData);
  return(

  <Layout>
  <article className="card col-6">
    <div className ="card-body">
    <h5 className ="card-title">{itemData.data.name}</h5>
    <p className ="card-text">{itemData.data.description}</p>
    {itemData.data.url ? 
    <a className="btn btn-warning" href={itemData.data.url}>Link here</a>
    : null
    }

    {itemData.data.nickname ?
    <p className="card-text">{itemData.data.nickname}</p>
    : null
    }
    </div>


  </article>
  </Layout>
  );
}