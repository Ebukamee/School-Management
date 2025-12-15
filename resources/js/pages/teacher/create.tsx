import React from 'react';
import { useForm } from '@inertiajs/react';

import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Results',
        href: 'results/create'
    }
];

type Subject = {
  name: string;
  ca_score: number;
  exam_score: number;
};

type FormData = {
  reg_number: string;
  class: string;
  term: string;
  remark: string;
  sess: string;
  subjects: Subject[];
};

const CreateResult: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    reg_number: '',
    class: '',
    term: '',
    remark: '',
    sess: '',
    subjects: [{ name: '', ca_score: 0, exam_score: 0 }],
  });

  // Add subject row
  const addSubject = () => {
    setData('subjects', [
      ...data.subjects,
      { name: '', ca_score: 0, exam_score: 0 },
    ]);
  };

  // Remove subject row
  const removeSubject = (index: number) => {
    const updatedSubjects = data.subjects.filter((_, i) => i !== index);
    setData('subjects', updatedSubjects);
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/results')
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Result</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Reg Number */}
        <div>
          <label className="block font-semibold mb-1">Reg Number</label>
          <input
            type="text"
            value={data.reg_number}
            onChange={e => setData('reg_number', e.target.value)}
            className="border p-2 w-full rounded"
          />
          {errors.reg_number && (
            <p className="text-red-500">{errors.reg_number}</p>
          )}
        </div>

        {/* Class */}
        <div>
          <label className="block font-semibold mb-1">Class</label>
          <input
            type="text"
            value={data.class}
            onChange={e => setData('class', e.target.value)}
            className="border p-2 w-full rounded"
          />
          {errors.class && (
            <p className="text-red-500">{errors.class}</p>
          )}
        </div>

        {/* Term */}
        <div>
          <label className="block font-semibold mb-1">Term</label>
          <input
            type="text"
            value={data.term}
            onChange={e => setData('term', e.target.value)}
            className="border p-2 w-full rounded"
          />
          {errors.term && (
            <p className="text-red-500">{errors.term}</p>
          )}
        </div>

        {/* Session */}
        <div>
          <label className="block font-semibold mb-1">Session</label>
          <input
            type="text"
            value={data.sess}
            onChange={e => setData('sess', e.target.value)}
            className="border p-2 w-full rounded"
          />
          {errors.sess && (
            <p className="text-red-500">{errors.sess}</p>
          )}
        </div>

        {/* Remark */}
        <div>
          <label className="block font-semibold mb-1">Remark</label>
          <input
            type="text"
            value={data.remark}
            onChange={e => setData('remark', e.target.value)}
            className="border p-2 w-full rounded"
          />
          {errors.remark && (
            <p className="text-red-500">{errors.remark}</p>
          )}
        </div>

        {/* Subjects */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Subjects</h2>

          {data.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.name}
                onChange={e => {
                  const subjects = [...data.subjects];
                  subjects[index].name = e.target.value;
                  setData('subjects', subjects);
                }}
                className="border p-2 flex-1 rounded"
              />

              <input
                type="number"
                placeholder="CA Score"
                value={subject.ca_score}
                onChange={e => {
                  const subjects = [...data.subjects];
                  subjects[index].ca_score = Number(e.target.value);
                  setData('subjects', subjects);
                }}
                className="border p-2 w-24 rounded"
              />

              <input
                type="number"
                placeholder="Exam Score"
                value={subject.exam_score}
                onChange={e => {
                  const subjects = [...data.subjects];
                  subjects[index].exam_score = Number(e.target.value);
                  setData('subjects', subjects);
                }}
                className="border p-2 w-24 rounded"
              />

              <button
                type="button"
                onClick={() => removeSubject(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSubject}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Subject
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default CreateResult;
