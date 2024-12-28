import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";

const AccountCard = ({account}) => {

    const {name, type, balance, id, isDefault} = account;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <Switch/>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    )
}
export default AccountCard;
