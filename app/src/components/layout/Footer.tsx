import footer from '../../styles/Footer.module.css'

const Footer = () => {
    return ( 
        <footer className={footer.footer}>
            <img className={footer.image} src="https://www.dynamicmarketing.eu/wp-content/uploads/2018/06/ecommerce.logo_.png" alt="" />
            <div className={footer.copyright}>
                <p>copyright 2023-2050</p>
            </div>
        </footer>
     );
}
 
export default Footer;