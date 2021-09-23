import React, { useState } from "react";
import axios from 'axios';
import { Button, Form, Input, Label } from "./styles/form-elements";
import { WilderInterface } from "./interfaces";

const defaultWilder: WilderInterface = { name: '', city: 'Villeurbanne' };

interface AddWilderProps {
    onWilderCreated: Function;
}

function AddWilder(props: AddWilderProps): JSX.Element {
    const [wilder, setWilder]: [WilderInterface, Function] = useState<WilderInterface>(defaultWilder);
    const [error, setError]: [string, Function] = useState<string>('');
    const [pending, setPending]: [boolean, Function] = useState<boolean>(false);

    const createWilder = async (): Promise<void> => {
        // send request to server
        setPending(true);
        try {
            const { data } = await axios.post('http://localhost:3552/api/wilders', wilder);
            if (data.success) {
                props.onWilderCreated();
                setError('');
                setWilder(defaultWilder);
            } else {
                setError(data.message || 'Error occured');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setPending(false);
        }
    };

    return (
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            // create wilder
            if (pending === false) {
                createWilder();
            }
        }}>
            <Label htmlFor="name-input">Name :</Label>
            <Input
                id="name-input"
                type="text"
                placeholder="Type the name"
                value={wilder.name}
                disabled={pending === true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>
                ): void => setWilder({ ...wilder, name: e.target.value })} />
            <Label htmlFor="city-input">City :</Label>
            <Input
                id="city-input"
                type="text"
                placeholder="Type the city"
                value={wilder.city}
                disabled={pending === true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>
                ): void => setWilder({ ...wilder, city: e.target.value })} />
            <Button
                disabled={pending === true}>Add</Button>
            {error !== '' && <p>{error}</p>}
            {pending && 'In progress...'}
        </Form>
    );
}

export default AddWilder;
