"use client";

import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';
import { Checkbox } from 'components/ui/checkbox';
import { Button } from 'components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'components/ui/select';
import postTodo from 'app/todos/actions/postTodo';
import patchTodo from 'app/todos/actions/patchTodo';
import { Priority } from 'constants/todo';

export const TodoForm = ({ todo, isUpdate }) => {
    const action = isUpdate ? patchTodo : postTodo;

    const dueDateDefVal = todo?.due_date ? todo.due_date.split('T')[0] : '';

    return (
        <form action={action} className='max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
            <input type='hidden' name='id' value={todo?.id} />

            <div className='mb-6'>
                <Label htmlFor='title' className='block text-lg font-medium text-gray-600'>
                    Title
                </Label>
                <Input
                    id='title'
                    name='title'
                    defaultValue={todo?.title}
                    required
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
                />
            </div>

            <div className='mb-6'>
                <Label htmlFor='description' className='block text-lg font-medium text-gray-700'>
                    Description
                </Label>
                <Textarea
                    id='description'
                    name='description'
                    defaultValue={todo?.description}
                    required
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
                />
            </div>

            <div className='mb-6'>
                <Label htmlFor='due_date' className='block text-lg font-medium text-gray-700'>
                    Due Date
                </Label>
                <Input
                    id='due_date'
                    name='due_date'
                    type='date'
                    defaultValue={dueDateDefVal}
                    required
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
                />
            </div>

            <div className='mb-6'>
                <Label htmlFor='priority' className='block text-lg font-medium text-gray-700'>
                    Priority
                </Label>
                <Select
                    defaultValue={todo?.priority ?? Priority.ANY}
                    name='priority'
                    required
                >
                    <SelectTrigger className='mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Priority.P1}>P1</SelectItem>
                        <SelectItem value={Priority.P2}>P2</SelectItem>
                        <SelectItem value={Priority.P3}>P3</SelectItem>
                        <SelectItem value={Priority.P4}>P4</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='mb-6 flex items-center'>
                <Checkbox
                    id='completed'
                    name='completed'
                    defaultChecked={todo?.completed || false}
                    className='mr-2'
                />
                <Label htmlFor='completed' className='text-lg font-medium text-gray-700'>
                    Is Completed
                </Label>
            </div>

            <Button
                type='submit'
                className='w-full bg-cyan-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            >
                {isUpdate ? 'Update' : 'Add'}
            </Button>
        </form>
    );
};

export default TodoForm;
