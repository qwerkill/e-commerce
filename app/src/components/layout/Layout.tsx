import Header from './Header';
import Footer from './Footer';
import { ReactNode, useContext } from 'react';


interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {


    return (
        <>  
            <Header/>
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;