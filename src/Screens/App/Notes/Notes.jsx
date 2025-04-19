import {ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Layout from '../Layout/Layout';
import MainHeader from '../../../components/Headers/MainHeader';
import {NotesCard} from '../../../components';

const Notes = () => {
  const notes = [
    {
      chapter: 'Chapter 1',
      title:
        'Comprehensive Overview of Key Concepts and Practical Insights for Effective Learning and Academic Success',
    },
    {
      chapter: 'Chapter 2',
      title:
        'Introduction to Machine Learning and Real-World Applications in Various Industries',
    },
    {
      chapter: 'Chapter 3',
      title:
        'Fundamental Principles of Economics with Real-Life Case Studies and Market Analysis',
    },
    {
      chapter: 'Chapter 4',
      title:
        'Step-by-Step Guide to Solving Complex Algebraic Expressions and Equations',
    },
    {
      chapter: 'Chapter 5',
      title:
        'Exploring the History and Impact of Major Scientific Discoveries in the Modern Era',
    },
    {
      chapter: 'Chapter 6',
      title:
        'In-Depth Analysis of Literary Themes in Classic and Contemporary Literature',
    },
    {
      chapter: 'Chapter 7',
      title:
        'Essential Tips for Time Management, Study Habits, and Academic Productivity',
    },
    {
      chapter: 'Chapter 8',
      title:
        'Detailed Explanation of Programming Paradigms and Software Development Methodologies',
    },
    {
      chapter: 'Chapter 9',
      title:
        'Understanding Psychological Theories and Their Influence on Human Behavior and Society',
    },
    {
      chapter: 'Chapter 10',
      title:
        'Key Strategies for Critical Thinking and Problem Solving in Academic Contexts',
    },
  ];

  const values = ['Class X', 'Class XI', 'Class XII', 'Class IX'];
  const [selectedValue, setSelectedValue] = useState(values[0]);
  return (
    <Layout>
      <MainHeader
        title="Notes"
        isBackable={false}
        values={values}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}>
        {notes.map((item, index) => (
          <NotesCard
            chapterName={item.chapter}
            noteText={item.title}
            key={index + 'notes-title'}
          />
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 30,
    gap: 12,
  },
});

export default Notes;
