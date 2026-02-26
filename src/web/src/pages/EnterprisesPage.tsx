import React , {useState , useContext} from "react";
import {useNavigate} from 'react-router-dom'
import {SelectEnterpriseContext ,type EnterpriseContextType  } from "@/context/enterpriseContext";
import type { JSX } from "react";

import PageTitle from "@/components/PageTitle";
import { FeatureCard, FeatureCardContent, FeatureCardContainer, FeatureCardTitle, FeatureCardIcon, FeatureCardText } from "@/components/ui/featureCards";
import { Building2, TrendingUp , EllipsisIcon } from "lucide-react";

export default function EnterprisesPage() : JSX.Element {
    const navigate = useNavigate()
    const {enterpriseSelected} = useContext(SelectEnterpriseContext) as EnterpriseContextType

    return (
        <main className="flex-1 overflow-y-auto p-6">
            <PageTitle subTitle="Veja os dados das empreasas que você está">
                Empresas
            </PageTitle>
            <FeatureCardContainer>
                <FeatureCard>
                    <FeatureCardContent>
                        <FeatureCardTitle>
                            Trocar empresa selecionada
                        </FeatureCardTitle>
                        <FeatureCardIcon className="bg-black" >
                            <Building2 className="text-white"/>
                        </FeatureCardIcon>
                    </FeatureCardContent>
                    <FeatureCardText>
                        Mudar : {enterpriseSelected?.name}
                    </FeatureCardText>
                </FeatureCard>
                <FeatureCard onClick={(e)=>navigate('/')}>
                    <FeatureCardContent>
                        <FeatureCardTitle >
                            Dados da empresa
                        </FeatureCardTitle>
                        <FeatureCardIcon className="bg-black" >
                            <TrendingUp className="text-white"/>
                        </FeatureCardIcon>
                    </FeatureCardContent>
                    <FeatureCardText>
                        Ir Para o Dashboard
                    </FeatureCardText>
                </FeatureCard>
                <FeatureCard >
                    <FeatureCardContent>
                        <FeatureCardTitle >
                            Outros
                        </FeatureCardTitle>
                        <FeatureCardIcon className="bg-black" >
                            <EllipsisIcon className="text-white"/>
                        </FeatureCardIcon>
                    </FeatureCardContent>
                    <FeatureCardText>
                        Ver outras informações sobre a empresa
                    </FeatureCardText>
                </FeatureCard>
            </FeatureCardContainer>
        </main>
    )
}